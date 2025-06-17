import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { 
  GraduationCap, 
  Building, 
  Users, 
  Trophy,
  Star,
  BookOpen
} from "lucide-react";

const companies = [
  { name: "Tata", logo: "/images/brand-logos/tata.png" },
  { name: "Bajaj Allianz", logo: "/images/brand-logos/bajaj.png" },
  { name: "PayPal", logo: "/images/brand-logos/paypal.png" },
  { name: "Marsh", logo: "/images/brand-logos/marsh.png" },
  { name: "Amazon", logo: "/images/brand-logos/amazon.png" },
];

const platforms = [
  { name: "Udemy", logo: "/images/brand-logos/udemy.png" },
  { name: "Coursera", logo: "/images/brand-logos/coursera.png" },
];

const achievements = [
  {
    icon: Users,
    title: "100,000+",
    subtitle: "Students Taught",
    description: "Across multiple platforms and corporate training programs"
  },
  {
    icon: BookOpen,
    title: "12+ Years",
    subtitle: "AI Experience",
    description: "Deep expertise in artificial intelligence and machine learning"
  },
  {
    icon: Building,
    title: "Fortune 500",
    subtitle: "Corporate Training",
    description: "Delivered AI training to top global companies"
  },
  {
    icon: Trophy,
    title: "Industry Expert",
    subtitle: "Recognized Authority",
    description: "Leading voice in AI education and implementation"
  }
];

export default function BootcampInstructor() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Learn from Industry Experts
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get trained by instructors with proven track records at top companies and 
            extensive experience teaching AI to professionals worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Instructor Profile */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Yash Thakker</h3>
              <p className="text-xl text-purple-400 mb-4">AI Expert & Senior Instructor</p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-300 ml-2">4.9/5 Rating (10,000+ Reviews)</span>
              </div>
            </div>

            {/* Bio */}
            <div className="text-gray-300 space-y-4 mb-8">
              <p>
                With over 12 years of experience in artificial intelligence and machine learning, 
                Yash has trained professionals at some of the world's most prestigious companies.
              </p>
              <p>
                His practical approach to AI education has helped over 100,000 students master 
                complex AI concepts and apply them in real-world scenarios.
              </p>
              <p>
                Yash specializes in making AI accessible to everyone, regardless of their 
                technical background, focusing on practical applications and hands-on learning.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge className="bg-purple-600 text-white">12+ Years Experience</Badge>
              <Badge className="bg-blue-600 text-white">100K+ Students</Badge>
              <Badge className="bg-green-600 text-white">AI Specialist</Badge>
              <Badge className="bg-orange-600 text-white">Corporate Trainer</Badge>
            </div>
          </div>

          {/* Achievements & Experience */}
          <div className="space-y-8">
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 p-4">
                    <CardContent className="p-0">
                      <div className="text-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 w-fit mx-auto mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{achievement.title}</div>
                        <div className="text-purple-400 font-semibold text-sm mb-2">{achievement.subtitle}</div>
                        <div className="text-gray-400 text-xs">{achievement.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Corporate Experience */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 text-center">Corporate Experience</h4>
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-items-center">
                    {companies.map((company, index) => (
                      <div key={index} className="text-center">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="h-8 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Teaching Platforms */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 text-center">Teaching Platforms</h4>
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-8 items-center justify-items-center">
                    {platforms.map((platform, index) => (
                      <div key={index} className="text-center">
                        <img 
                          src={platform.logo} 
                          alt={platform.name} 
                          className="h-10 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Learn from the Best?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of professionals who have accelerated their AI journey with expert guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <Star className="w-4 h-4" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Users className="w-4 h-4" />
                <span>100K+ Successful Students</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Trophy className="w-4 h-4" />
                <span>Industry Recognition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 