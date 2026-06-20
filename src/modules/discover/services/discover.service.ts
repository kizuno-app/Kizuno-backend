import { redisClient } from '../../../shared/redis';
import { PostService } from '../../post/services/post.service';
import { UserService } from '../../user/services/user.service';
import { ConnectionService } from '../../connection/services/connection.service';

export class DiscoverService {
  static async getTrendingPosts(limit = 10, organizationId?: string) {
    const key = organizationId ? `feed:org:${organizationId}` : 'feed:global:trending';
    const postIds = await redisClient.zrevrange(key, 0, limit - 1);
    
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

    // Format user output (org accounts are just profiles with isOrgAccount=true)
    const formattedUsers = suggestedProfiles.map(profile => ({
      type: 'user',
      data: {
        id: profile.userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatar: profile.avatar,
        bio: profile.bio,
        skills: profile.skills,
        college: profile.college,
        branch: profile.branch,
        year: profile.year,
        isOrgAccount: profile.isOrgAccount || false,
        verified: profile.verified || false,
        isFollowing: false,
        mutualConnections: mutualCounts.get(profile.userId) || 0
      }
    }));

    return formattedUsers;
  }
}
