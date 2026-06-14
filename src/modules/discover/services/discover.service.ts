import { redisClient } from '../../../shared/redis';
import { PostService } from '../../post/services/post.service';
import { UserService } from '../../user/services/user.service';
import { ConnectionService } from '../../connection/services/connection.service';

export class DiscoverService {
  static async getTrendingPosts(limit = 10) {
    // In a real scenario, this would use a background job to aggregate top posts by likes/velocity in the last 24h
    // For now, we simulate fetching trending posts using a predefined Redis sorted set 'trending:posts'
    const postIds = await redisClient.zrevrange('trending:posts', 0, limit - 1);
    
    if (postIds.length === 0) {
      return [];
    }

    const posts = await Promise.all(
      postIds.map(id => PostService.getPost(id).catch(() => null))
    );

    return posts.filter(p => p !== null);
  }

  static async getSuggestedUsers(userId: string, searchQuery?: string) {
    const following = userId ? await ConnectionService.getFollowing(userId) : [];
    const followingIds = following.map(f => f.followingId);

    let suggestedProfiles: any[] = [];
    let mutualCounts = new Map<string, number>();

    // 1. Try to get mutual suggestions first if there's no search query
    if (userId && (!searchQuery || searchQuery.trim().length === 0)) {
      const mutuals = await ConnectionService.getSuggestedFollows(userId, followingIds, 20);
      for (const m of mutuals) {
        mutualCounts.set(m.userId, m.mutualCount);
      }

      if (mutuals.length > 0) {
        const mutualUserIds = mutuals.map(m => m.userId);
        const mutualProfilesData = await UserService.getProfilesByIds(mutualUserIds);
        suggestedProfiles.push(...mutualProfilesData);
      }
    }

    // 2. If we need more (or if search is active), fetch new/matching profiles excluding followings and already suggested
    if (suggestedProfiles.length < 20) {
      const excludeIds = [...followingIds, ...suggestedProfiles.map(p => p.userId)];
      const limitRemaining = 20 - suggestedProfiles.length;
      const additionalProfiles = await UserService.getProfilesExcluding(userId, limitRemaining, searchQuery, excludeIds);
      suggestedProfiles.push(...additionalProfiles);
    }

    // Format output
    return suggestedProfiles.map(profile => ({
      id: profile.userId,
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatar: profile.avatar,
      bio: profile.bio,
      skills: profile.skills,
      college: profile.college,
      branch: profile.branch,
      year: profile.year,
      isFollowing: false, // They are explicitly excluded from followings
      mutualConnections: mutualCounts.get(profile.userId) || 0
    }));
  }
}
