import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Headphones,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      details: ["123 AgriTech Lane", "Farm Valley, CA 94105", "United States"],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "Mon-Fri: 8:00 AM - 6:00 PM PST", "Emergency: +1 (555) 987-6543"],
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email Contact",
      details: ["support@agriwatch.ai", "sales@agriwatch.ai", "partnerships@agriwatch.ai"],
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"],
      color: "text-warning"
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about our platform, pricing, or getting started",
      action: "Start Chat"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Help with platform issues, integrations, or troubleshooting",
      action: "Get Support"
    },
    {
      icon: FileText,
      title: "Sales & Demos",
      description: "Schedule a demo or discuss enterprise solutions",
      action: "Schedule Demo"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Have questions about AgriWatch AI? We're here to help you transform 
            your agricultural operations with our intelligent farming solutions.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="card-gradient border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-32"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-sm text-muted-foreground">
                      * Required fields. We typically respond within 24 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Multiple ways to reach our team. Choose the option that works best for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="card-gradient hover-lift border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                          <info.icon className={`h-6 w-6 ${info.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Can We Help?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the type of support you need and we'll connect you with the right team member.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="card-gradient hover-lift border-0 text-center">
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10">
                      <option.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {option.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-muted-foreground">
              Located in the heart of California's agricultural innovation district.
            </p>
          </div>
          
          <Card className="card-gradient border-0 overflow-hidden">
            <div className="h-96 bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Interactive map will be available here
                </p>
                <p className="text-sm text-muted-foreground">
                  123 AgriTech Lane, Farm Valley, CA 94105
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;