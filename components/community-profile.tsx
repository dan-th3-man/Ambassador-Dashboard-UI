'use client'

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowUp, ArrowDown, Medal, Star, Crown, Lock, Wallet, Clock, CheckCircle, XCircle, HourglassIcon } from "lucide-react"

// Actual data
const userData = {
  name: "Jane Doe",
  walletAddress: "0x1234...5678",
  balance: 1500,
  badges: [
    { name: "Early Adopter", image: "https://us.v-cdn.net/6031209/uploads/OPDDDWHYXQ7P/community-badge-ai-1200x1200.png?height=80&width=80", unlocked: true },
    { name: "Top Contributor", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxK013lNA-a1V1ogOBCpYlQDnm6AXQRzZdZQ&s?height=80&width=80", unlocked: true },
    { name: "Bug Hunter", image: "https://cdn3.emoji.gg/emojis/9596-blurple-bug-hunter-1.png?height=80&width=80", unlocked: true },
    { name: "Innovator", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23E5E7EB'/%3E%3C/svg%3E", unlocked: false },
    { name: "Mentor", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23E5E7EB'/%3E%3C/svg%3E", unlocked: false },
    { name: "Event Organizer", image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23E5E7EB'/%3E%3C/svg%3E", unlocked: false },
  ],
  leaderboardPosition: 42,
  currentTier: "Silver",
  nextTier: "Gold",
  tierProgress: 75,
  recentRewards: [
    { type: "badge", name: "Bug Hunter", date: "2023-04-01" },
    { type: "points", amount: 500, date: "2023-03-28" },
    { type: "badge", name: "Top Contributor", date: "2023-03-15" },
  ],
}

const leaderboardData = [
  { position: 39, name: "Alex Smith", points: 2850, change: 2 },
  { position: 40, name: "Maria Garcia", points: 2800, change: -1 },
  { position: 41, name: "John Wilson", points: 2775, change: 3 },
  { position: 42, name: "Jane Doe", points: 2750, change: -2 },
  { position: 43, name: "Sam Brown", points: 2700, change: 1 },
  { position: 44, name: "Lisa Chen", points: 2650, change: -3 },
  { position: 45, name: "Mike Johnson", points: 2600, change: 0 },
]

const missions = [
  { id: 1, name: "Create a Tutorial", subtitle: "Share your knowledge with the community", status: "live", budget: 1000, completed: 5, points: 100, tokens: 50 },
  { id: 2, name: "Organize Community Event", subtitle: "Bring members together for a virtual meetup", status: "upcoming", budget: 2000, completed: 0, points: 200, tokens: 100 },
  { id: 3, name: "Bug Reporting Challenge", subtitle: "Help improve our platform by finding and reporting bugs", status: "expired", budget: 500, completed: 10, points: 50, tokens: 25 },
  { id: 4, name: "Social Media Campaign", subtitle: "Spread the word about our community on social platforms", status: "live", budget: 1500, completed: 3, points: 150, tokens: 75 },
  { id: 5, name: "Code Review Marathon", subtitle: "Review and provide feedback on community projects", status: "awaiting_moderation", budget: 1200, completed: 1, points: 120, tokens: 60 },
  { id: 6, name: "Documentation Sprint", subtitle: "Help improve our project documentation", status: "completed", budget: 800, completed: 8, points: 80, tokens: 40 },
]

const missionOrder = ["live", "awaiting_moderation", "upcoming", "completed", "expired"]

export function CommunityProfileComponent() {
  const [openModal, setOpenModal] = useState(false)
  const [selectedMission, setSelectedMission] = useState<(typeof missions)[0] | null>(null)
  const [filter, setFilter] = useState("all")

  const sortedMissions = [...missions].sort((a, b) => 
    missionOrder.indexOf(a.status) - missionOrder.indexOf(b.status)
  )

  const filteredMissions = sortedMissions.filter(mission => 
    filter === "all" || mission.status === filter
  )

  const handleMissionSubmit = (missionId: number, submission: Record<string, string | File>) => {
    console.log(`Submitted for mission ${missionId}:`, submission)
    const updatedMissions = missions.map(mission => 
      mission.id === missionId ? { ...mission, status: "awaiting_moderation" } : mission
    )
    console.log("Updated missions:", updatedMissions)
    setOpenModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4 space-y-6">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold">
            {userData.name}&apos;s Profile
          </h1>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Wallet className="w-5 h-5 text-gray-600" />
            <span className="font-mono text-gray-600">{userData.walletAddress}</span>
            <Badge variant="outline" className="ml-2">
              {userData.balance} Points
            </Badge>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Tier Progress</CardTitle>
            <CardDescription>Your current tier and progress towards the next</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Current Tier: {userData.currentTier}</span>
              <span className="text-lg">Next Tier: {userData.nextTier}</span>
            </div>
            <Progress value={userData.tierProgress} className="h-4">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${userData.tierProgress}%` }} />
            </Progress>
            <div className="text-right text-sm text-gray-600">{userData.tierProgress}% complete</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Achievements you&apos;ve unlocked and future goals</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {userData.badges.map((badge) => (
              <div key={badge.name} className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-2">
                  <div className={`w-full h-full rounded-full bg-gray-200 ${!badge.unlocked && 'grayscale'}`}>
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {!badge.unlocked && (
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <Badge variant={badge.unlocked ? "outline" : "secondary"} 
                      className={`text-sm py-1 ${badge.unlocked ? 'border-blue-500 text-blue-500' : 'bg-gray-200 text-gray-600'}`}>
                  {badge.name}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Position</CardTitle>
              <CardDescription>Your rank in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.map((user) => (
                  <div
                    key={user.position}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      user.name === userData.name ? "bg-blue-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 text-gray-600">#{user.position}</span>
                      <span className="font-medium">
                        {user.name}
                        {user.name === userData.name && (
                          <span className="ml-2 text-sm text-gray-600">(You)</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{user.points}</span>
                      {user.change !== 0 && (
                        <div className={`flex items-center ${user.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {user.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          <span className="text-xs">{Math.abs(user.change)}</span>
                        </div>
                      )}
                      {user.position <= 3 && <Crown className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Rewards</CardTitle>
              <CardDescription>Your latest achievements and point gains</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {userData.recentRewards.map((reward, index) => (
                  <li key={index} className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-b-0">
                    <div className="flex items-center">
                      {reward.type === "badge" ? (
                        <Medal className="w-5 h-5 mr-2 text-blue-500" />
                      ) : (
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      )}
                      <span>
                        {reward.type === "badge" ? reward.name : `${reward.amount} points`}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{reward.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Open Missions</CardTitle>
            <CardDescription>Available missions and their details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <RadioGroup defaultValue="all" onValueChange={setFilter} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="live" />
                  <Label htmlFor="live">Live</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expired" id="expired" />
                  <Label htmlFor="expired">Expired</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredMissions.map((mission) => (
                <Card key={mission.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{mission.name}</CardTitle>
                    <CardDescription>{mission.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        {mission.status === "live" && <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
                        {mission.status === "upcoming" && <Clock className="w-4 h-4 text-yellow-500 mr-1" />}
                        {mission.status === "expired" && <XCircle className="w-4 h-4 text-red-500 mr-1" />}
                        {mission.status === "awaiting_moderation" && <HourglassIcon className="w-4 h-4 text-blue-500 mr-1" />}
                        {mission.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
                        <span className="capitalize">{mission.status.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Budget:</span>
                        <span className="font-semibold">{mission.budget} Points</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span>{mission.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reward:</span>
                        <span>{mission.points} points, {mission.tokens} tokens</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {mission.status === "live" && (
                      <Button 
                        onClick={() => {
                          setSelectedMission(mission)
                          setOpenModal(true)
                        }}
                        className="w-full"
                      >
                        Complete Mission
                      </Button>
                    )}
                    {mission.status === "awaiting_moderation" && (
                      <Badge variant="outline" className="w-full justify-center">
                        Awaiting Moderation
                      </Badge>
                    )}
                    
                    {mission.status === "completed" && (
                      <Badge variant="outline" className="w-full justify-center">
                        Completed
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Mission: {selectedMission?.name}</DialogTitle>
              <DialogDescription>{selectedMission?.subtitle}</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              if (selectedMission) {
                handleMissionSubmit(selectedMission.id, Object.fromEntries(formData))
              }
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="submission" className="col-span-4">
                    Your Submission
                  </Label>
                  <Textarea
                    id="submission"
                    name="submission"
                    placeholder="Describe your mission completion here..."
                    className="col-span-4"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="col-span-4">
                    Upload Image
                  </Label>
                  <Input 
                    id="image" 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    className="col-span-4" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="col-span-4">
                    Post URL
                  </Label>
                  <Input 
                    id="url" 
                    name="url" 
                    type="url" 
                    placeholder="https://..." 
                    className="col-span-4" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="social-media" className="col-span-4">
                    Social Media Platform
                  </Label>
                  <Select name="socialMedia">
                    <SelectTrigger className="col-span-4">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  Submit Mission
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="text-center">
          <Button variant="outline">
            View Full History
          </Button>
        </div>
      </div>
    </div>
  )
}