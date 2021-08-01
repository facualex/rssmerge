<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedMix extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'urlIdentifier',
        'cronTriggerTime',
        'user_id',
    ];

    protected $nullable = [
        'urlIdentifier',
    ];

    /**
     * Get user that owns the FeedMix 
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get the created Feeds of the FeedMix
     */
    public function feeds()
    {
        return $this->hasMany(Feed::class, 'feed_mix_id', 'id');
    }
}
