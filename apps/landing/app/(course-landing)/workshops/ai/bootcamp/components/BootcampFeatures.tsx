import { Card, CardContent } from "@repo/ui/components/ui/card";
import { 
  Zap, 
  Users, 
  Trophy, 
  Infinity,
  BookOpen,
  Code,
  Calendar,
  Target
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Hands-on Learning",
    description: "Build real AI applications, tools, and automations you can use immediately in your work.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Cohort-Based Learning", 
    description: "Learn alongside peers, collaborate on projects, and build lasting professional connections.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Trophy,
    title: "Industry Certification",
    description: "Earn a recognized certificate showcasing your AI expertise to employers and clients.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Infinity,
    title: "Lifetime Access",
    description: "Get permanent access to ExplainX AI community, updates, and new tools as they emerge.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "Cover every aspect of AI from prompting to building apps, with real-world use cases.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Code,
    title: "Build Real Apps",
    description: "Create note-taking apps, games, marketing tools, and more using cutting-edge AI.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Calendar,
    title: "Weekend Flexibility",
    description: "Perfect for working professionals - only weekends, 2 hours per session.",
    color: "from-teal-500 to-blue-500"
  },
  {
    icon: Target,
    title: "Career Focused",
    description: "Learn skills that directly translate to career advancement and new opportunities.",
    color: "from-orange-500 to-red-500"
  }
];

export default function BootcampFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Our AI Bootcamp?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            More than just another course - this is a complete transformation program designed 
            to make you an AI expert in just 5 weeks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
                <div className="text-gray-300 text-sm">AI Tools & Techniques</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">20</div>
                <div className="text-gray-300 text-sm">Hours of Training</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">10+</div>
                <div className="text-gray-300 text-sm">Real Projects Built</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">∞</div>
                <div className="text-gray-300 text-sm">Lifetime Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Build Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">What You'll Actually Build</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-b from-purple-900/50 to-blue-900/50 border-purple-500/50">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">📝</div>
                <h4 className="text-xl font-bold text-white mb-3">AI Note-Taking App</h4>
                <p className="text-gray-300 text-sm">
                  Intelligent note organizer that summarizes, categorizes, and connects your ideas automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-green-900/50 to-emerald-900/50 border-green-500/50">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">🎮</div>
                <h4 className="text-xl font-bold text-white mb-3">AI-Powered Games</h4>
                <p className="text-gray-300 text-sm">
                  Interactive games with AI characters that adapt and respond intelligently to player actions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-orange-900/50 to-red-900/50 border-orange-500/50">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">📈</div>
                <h4 className="text-xl font-bold text-white mb-3">Marketing Automation</h4>
                <p className="text-gray-300 text-sm">
                  Complete marketing stack that generates content, designs assets, and optimizes campaigns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 