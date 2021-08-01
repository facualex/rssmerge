<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feed extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'feedOrigin',
        'feed_mix_id',
        'feed_status_id',
        'feed_type_id',
    ];

    /**
     * Get the FeedMix where the Feed is created
     */
    public function feedMix()
    {
        return $this->belongsTo(FeedMix::class, 'feed_mix_id', 'id');
    }


    /**
     * Get the current status of the feed 
     */
    public function feedStatus()
    {
        return $this->belongsTo(FeedStatus::class, 'feed_status_id', 'id');
    }

    /**
     * Get the type of the feed
     */
    public function feedType()
    {
        return $this->belongsTo(FeedType::class, 'feed_type_id', 'id');
    }

}
