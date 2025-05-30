import { UserSettings } from '@/features/user'
import { LeaderboardUserRow } from '@/features/leaderboards'
import { GiveawayScroller } from '@/features/giveaways'

const ProfilePage = () => {
  return (
    <div className='pageOpeningAnimation'>
      <UserSettings />
      <LeaderboardUserRow />
      <GiveawayScroller display='joined' />
      <GiveawayScroller display='win' />
    </div>
  )
}

export default ProfilePage