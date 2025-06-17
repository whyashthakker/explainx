import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { 
  Brain, 
  FileText, 
  Image, 
  Video, 
  Code, 
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react";

const weekData = [
  {
    week: 1,
    title: "Prompting & Vibe Coding",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    duration: "4 hours",
    sessions: ["Saturday 2hrs", "Sunday 2hrs"],
    topics: [
      "Advanced Prompting Techniques",
      "Prompt Engineering Best Practices", 
      "Vibe Coding with AI",
      "Context Management",
      "Multi-shot Prompting"
    ],
    tools: ["ChatGPT", "Claude AI", "Cursor", "GitHub Copilot"],
    useCases: [
      "Writing effective prompts for any task",
      "Code generation and debugging",
      "Content ideation and planning",
      "Problem-solving workflows"
    ]
  },
  {
    week: 2,
    title: "Text Generation Mastery",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    duration: "4 hours",
    sessions: ["Saturday 2hrs", "Sunday 2hrs"],
    topics: [
      "Marketing Copy Generation",
      "Sales Email Sequences",
      "Financial Reports & Analysis",
      "Content Strategy",
      "Brand Voice Development"
    ],
    tools: ["ChatGPT", "Claude AI", "Jasper", "Copy.ai"],
    useCases: [
      "Create marketing campaigns that convert",
      "Write compelling sales emails",
      "Generate financial insights and reports",
      "Develop content calendars",
      "Build brand messaging guidelines"
    ]
  },
  {
    week: 3,
    title: "Image Generation & Design",
    icon: Image,
    color: "from-green-500 to-emerald-500",
    duration: "4 hours",
    sessions: ["Saturday 2hrs", "Sunday 2hrs"],
    topics: [
      "AI Image Generation",
      "Brand Asset Creation",
      "Product Mockups",
      "Social Media Graphics",
      "Image Editing with AI"
    ],
    tools: ["DALL-E 3", "Midjourney", "Stable Diffusion", "Adobe Firefly"],
    useCases: [
      "Create stunning marketing visuals",
      "Design product mockups instantly",
      "Generate social media content",
      "Build brand assets at scale",
      "Edit and enhance existing images"
    ]
  },
  {
    week: 4,
    title: "Video & Audio Generation",
    icon: Video,
    color: "from-red-500 to-pink-500",
    duration: "4 hours",
    sessions: ["Saturday 2hrs", "Sunday 2hrs"],
    topics: [
      "AI Video Creation",
      "Voiceover Generation",
      "Music & Sound Effects",
      "Video Editing Automation",
      "Podcast Production"
    ],
    tools: ["Sora", "Veo 3 Google", "HeyGen", "ElevenLabs", "Runway ML"],
    useCases: [
      "Create professional marketing videos",
      "Generate realistic voiceovers",
      "Produce podcast content",
      "Build explainer videos",
      "Automate video editing workflows"
    ]
  },
  {
    week: 5,
    title: "Build AI Applications",
    icon: Code,
    color: "from-yellow-500 to-orange-500",
    duration: "4 hours",
    sessions: ["Saturday 2hrs", "Sunday 2hrs"],
    topics: [
      "AI App Development",
      "Note-Taking Applications",
      "AI-Powered Games",
      "Marketing Automation Tools",
      "Custom AI Workflows"
    ],
    tools: ["Cursor", "Replit", "Bolt.new", "Claude AI", "OpenAI API"],
    useCases: [
      "Build intelligent note-taking apps",
      "Create AI-powered games",
      "Develop marketing automation tools",
      "Build custom ChatGPT clones",
      "Deploy AI applications to production"
    ]
  }
];

export default function BootcampCurriculum() {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Complete 5-Week Curriculum
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive journey from AI basics to building production-ready applications. 
            Each week builds upon the previous, ensuring you master every aspect of AI.
          </p>
        </div>

        {/* Curriculum Cards */}
        <div className="space-y-8">
          {weekData.map((week, index) => {
            const IconComponent = week.icon;
            return (
              <Card key={week.week} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${week.color}`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          Week {week.week}
                        </Badge>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{week.duration}</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl text-white mb-2">{week.title}</CardTitle>
                      <div className="flex gap-2 text-sm text-gray-400">
                        {week.sessions.map((session, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{session}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Topics */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">What You'll Learn</h4>
                      <ul className="space-y-2">
                        {week.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Tools Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {week.tools.map((tool, idx) => (
                          <Badge key={idx} className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Real-World Applications</h4>
                      <ul className="space-y-2">
                        {week.useCases.slice(0, 3).map((useCase, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">
                            • {useCase}
                          </li>
                        ))}
                        {week.useCases.length > 3 && (
                          <li className="text-gray-400 text-sm">
                            + {week.useCases.length - 3} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your AI Skills?
            </h3>
            <p className="text-gray-300 mb-6">
              Join our cohort-based learning program and get lifetime access to ExplainX AI community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-600 text-white px-3 py-1">
                ✅ Hands-on Projects
              </Badge>
              <Badge className="bg-blue-600 text-white px-3 py-1">
                ✅ Expert Mentorship
              </Badge>
              <Badge className="bg-purple-600 text-white px-3 py-1">
                ✅ Lifetime Community Access
              </Badge>
              <Badge className="bg-orange-600 text-white px-3 py-1">
                ✅ Certificate of Completion
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 