<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\FeedMix;
use Illuminate\Database\Eloquent\Builder;
use Webpatser\Uuid\Uuid;
use \SimpleXMLElement;
use \DomDocument;

class FeedMixController extends Controller
{
    /**
     * Display a listing of the resource for the authenticated user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $loggedUser = $request->user();

        $userMixes = FeedMix::whereHas('feeds', function (Builder $query) use($loggedUser) {
            return $query->where('user_id', '=', $loggedUser->id);
        })->get();

        return response()->json([
            'data' => $userMixes,
            'success' => true,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $loggedUser = $request->user();

        $fields = $request->validate([
            'name' => 'required|string',
            'cronTriggerTime' => 'required|integer',
        ]);

        // TODO: Set up a cron service every 'cronTriggerTime' 
        /*
            - The cron service must check every feed on the mix
                and create a rss merge from their individual feeds
            - Create and save an xml file on the server containing the merge
            - Update urlIdentifier of the feed mix 
        */

        $urlIdentifier = Uuid::generate()->string;

        // Create
        $initialXML = new SimpleXMLElement('<?xml version="1.0"?>
            <rss version="2.0">
                <channel>
                </channel>
            </rss>');

        $dom = new DOMDocument;
        $dom->preserveWhiteSpace = false;
        $doc->formatOutput = true;
        $dom->loadXML($initialXML->asXML());

        //Save XML as a file
        $dom->save(public_path().'/xml/'.$urlIdentifier.'.xml');

        $feed = FeedMix::create([
            'name' => $fields['name'],
            'urlIdentifier' => $urlIdentifier,
            'cronTriggerTime' => $fields['cronTriggerTime'],
            'user_id' => $loggedUser->id,
        ]);

        $response = [
            'success' => true,
            'data' => $feed,
        ];

        return response($response, 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $loggedUser = $request->user();

        $feedMix = FeedMix::firstWhere('id', $id)->get();

        if ($feedMix->user_id != $loggedUser->id || isset($feedMix)) {
            return response([
                "success" => false,
                "message" => "You are not allowed to execute that action"
            ], 401); // 401: Unauthorized
        }

        $response = [
            'success' => true,
            'data' => $feed,
        ];

        return response($response, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $loggedUser = $request->user();

        $fields = $request->validate([
            'name' => 'string',
            'urlIdentifier' => 'string|unique:feed_mixes,urlIdentifier',
            'cronTriggerTime' => 'integer',
        ]);


        $feedMix = FeedMix::firstWhere('id', $id)->get();

        if ($feedMix->user_id != $loggedUser->id || isset($feedMix)) {
            return response([
                "success" => false,
                "message" => "You are not allowed to execute that action"
            ], 401); // 401: Unauthorized
        }

        $feedMix->update($fields);

        $response = [
            'success' => true,
            'data' => $feedMix,
        ];

        return response($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedMix = FeedMix::firstWhere('id', $id)->get();

        if ($feedMix->user_id != $loggedUser->id || isset($feedMix)) {
            return response([
                "success" => false,
                "message" => "You are not allowed to execute that action"
            ], 401); // 401: Unauthorized
        }

        $feedMix->delete();

        $response = [
            'success' => true,
            'data' => 'Feed mix deleted',
        ];

        return response($response, 200);
    }
}
