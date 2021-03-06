<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feed;
use App\Models\FeedMix;
use Illuminate\Database\Eloquent\Builder;
use \SimpleXMLElement;
use \DomDocument;
use App\Utils\MergeRSS;
use App\Utils\Serialize;

class FeedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $loggedUser = $request->user();

        $userMixes = FeedMix::whereHas('feeds', function (Builder $query) use($loggedUser) {
            return $query->where('user_id', '=', $loggedUser->id);
        })->get();

        $feeds = array();

        foreach ($userMixes as $mix) {
            $feedsFromMix = $mix->feeds;
            array_push($feeds, ...$feedsFromMix);
        }

        $serialized = (new Serialize)->serialize($feeds);

        ['elements' => $feeds, 'elementsById' => $feedsById] = $serialized;

        $response = [
            'success' => true,
            'data' => ["feeds" => $feeds, "feedsById" => $feedsById],
        ];

        return response($response, 200);
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
            'feedOrigin' => 'required|string',
            'feed_mix_id' => 'required|integer',
            'feed_status_id' => 'required|integer',
            'feed_type_id' => 'required|integer'
        ]);

        $destinationFeedMixToCreateFeedInto = FeedMix::where("id", $fields['feed_mix_id'])->get()->first();

        if(!isset($destinationFeedMixToCreateFeedInto)) {
            return response([
                "success" => false,
                "message" => "The required feed mix doesn't exist"
            ], 400); // 400: Bad Request
        }

        // You can't create a feed inside a FeedMix that you don't own
        if ($destinationFeedMixToCreateFeedInto->user_id != $loggedUser->id) {
            return response([
                "success" => false,
                "message" => "You are not allowed to execute that action"
            ], 401); // 401: Unauthorized
        }

        $feed = Feed::create([
            'name' => $fields['name'],
            'feedOrigin' => $fields['feedOrigin'],
            'feed_mix_id' => $fields['feed_mix_id'],
            'feed_status_id' => $fields['feed_status_id'],
            'feed_type_id' => $fields['feed_type_id'],
        ]);

        // FIXME: It is not merging correctly, the result xml file
        // only displays the $remoteFeed but overrides the $currentFeedString

        $isYoutubeFeed = $feed->feed_type_id == 1; // feed_type_id = 1 -> YouTube

        $dom = new DOMDocument;
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = true;

        $dom->load(public_path()."/xml/".$destinationFeedMixToCreateFeedInto->urlIdentifier.".xml");
        $currentFeedString = simplexml_load_string($dom->saveXML());

        if (!isset($dom)) {
                // If the xml file doesn't exist, create it and update the urlIdentifier
                // of the corresponding FeedMix (this should only happen in strange cases, 
                // for example, if the user manually deletes the xml file from the public folder)
                return;
        }

        if (!$isYoutubeFeed) {
            // At this stage, an xml file for the feed mix should exist because it
            // is created when the user creates the feed mix. 
            // An existing feed mix is required to create a feed. 

            // Make sure the following option is activated in php.ini on the server:
            // allow_url_fopen = On 
            // for parsing the feeds from url
            $remoteFeed = simplexml_load_file($feed->feedOrigin);

            $mergedFeed = (new MergeRSS)->merge_rss(array($currentFeedString, $remoteFeed));
        } else {
            //  - If it is a youtube feed, load the rss with youtube format
            $youtubeFeedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=".$feed->feedOrigin;
            $remoteFeed = simplexml_load_file($youtubeFeedUrl); 
            $mergedFeed = (new MergeRSS)->merge_rss(array($currentFeedString, $remoteFeed));
        }

        $dom->loadXML($mergedFeed->asXML());

        // Save updated xml file
        $dom->save(public_path().'/xml/'.$destinationFeedMixToCreateFeedInto->urlIdentifier.'.xml');

        $response = [
            'success' => true,
            'data' => $feed,
            'currentFeedString' => $currentFeedString,
            'mergedFeed' => $mergedFeed,
            'remoteFeed' => $remoteFeed
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

        $feed = Feed::firstWhere('feed_id', $id)->get();

        $feedMixOfFeed = FeedMix::firstWhere('id', $feed->feed_mix_id)->get();

        if ($feedMixOfFeed->user_id != $loggedUser->id || isset($feedMixOfFeed)) {
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
        // TODO: Recreate feedmix xml file if status is updated

        $loggedUser = $request->user();

        $fields = $request->validate([
            'name' => 'string',
            'feedOrigin' => 'string',
            'feed_status_id' => 'integer',
            'feed_type_id' => 'integer'
        ]);

        $feed = Feed::firstWhere('feed_id', $id)->get();

        $feedMixOfFeed = FeedMix::firstWhere('id', $feed->feed_mix_id)->get();

        if ($feedMixOfFeed->user_id != $loggedUser->id || isset($feedMixOfFeed)) {
            return response([
                "success" => false,
                "message" => "You are not allowed to execute that action"
            ], 401); // 401: Unauthorized
        }

        $feed->update($fields);

        $response = [
            'success' => true,
            'data' => $feed,
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
        $feed = Feed::firstWhere('feed_id', $id)->get();

        $feedMixOfFeed = FeedMix::firstWhere('id', $feed->feed_mix_id)->get();

        if ($feedMixOfFeed->user_id != $loggedUser->id || isset($feedMixOfFeed)) {
            return response([
                "success" => false,
                "message" => "You are not allowed to execute that action"
            ], 401); // 401: Unauthorized
        }

        $feed->delete();

        $response = [
            'success' => true,
            'data' => 'Feed deleted',
        ];

        return response($response, 200);
    }
}
