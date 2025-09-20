import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Users, 
  Award, 
  Globe, 
  Leaf, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promoting environmentally responsible farming practices through intelligent resource management."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Leveraging cutting-edge AI and remote sensing technology to revolutionize agriculture."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Supporting farmers worldwide to increase productivity while preserving our planet."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering precision agriculture solutions with unmatched accuracy and reliability."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      expertise: "AI & Machine Learning",
      description: "15+ years in agricultural AI research"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Remote Sensing",
      expertise: "Satellite & Drone Technology",
      description: "Former NASA research scientist"
    },
    {
      name: "Dr. Amara Okafor",
      role: "Agricultural Scientist",
      expertise: "Crop Science & Agronomy",
      description: "PhD in Sustainable Agriculture"
    },
    {
      name: "James Thompson",
      role: "Product Director",
      expertise: "AgTech Solutions",
      description: "20+ years in agricultural technology"
    }
  ];

  const achievements = [
    "50,000+ acres monitored globally",
    "95% accuracy in pest prediction",
    "30% average water savings",
    "25% average yield increase"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About AgriWatch AI
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              We're transforming agriculture through artificial intelligence, 
              remote sensing, and precision farming technologies to create a 
              more sustainable and productive future for farmers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                To empower farmers with intelligent, data-driven insights that optimize 
                crop yields, reduce environmental impact, and ensure food security for 
                growing global populations.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Through advanced satellite imagery, IoT sensors, and machine learning 
                algorithms, we provide real-time agricultural intelligence that helps 
                farmers make informed decisions about irrigation, fertilization, pest 
                control, and harvest timing.
              </p>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-lg text-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="card-gradient border-0 p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Vision</h3>
                    <p className="text-muted-foreground">
                      A world where every farmer has access to intelligent agricultural 
                      insights, enabling sustainable farming practices that feed the 
                      planet while protecting our environment.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-gradient border-0 p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Impact</h3>
                    <p className="text-muted-foreground">
                      Supporting over 10,000 farmers across 6 continents with 
                      AI-powered agricultural solutions that increase productivity 
                      while reducing resource consumption.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our commitment to revolutionizing agriculture 
              through responsible innovation and sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-gradient hover-lift border-0 text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experts behind AgriWatch AI - a diverse team of agricultural 
              scientists, AI researchers, and technology innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-gradient hover-lift border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-accent mb-2">
                    {member.expertise}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the Agricultural Revolution
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Ready to transform your farming operations with AI-powered insights? 
            Get started today and see the difference precision agriculture can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/login">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;