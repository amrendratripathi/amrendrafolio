import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "amrendraramtripathibtech23-27@liet.in",
      action: "mailto:your-amrendraramtripathibtech23-27@liet.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9693748320",
      action: "tel:+919693748320",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Greater Noida, UP, India",
      action: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      username: "@amrendratripathi",
      action: "https://github.com/amrendratripathi",
      color: "hover:text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      username: "amrendra-ram-tripathi",
      action: "https://www.linkedin.com/in/amrendra-tripathi-67b906279",
      color: "hover:text-accent",
    },
    {
      icon: Mail,
      label: "Email",
      username: "Get in touch",
      action: "mailto:amrendra.tripathi@example.com",
      color: "hover:text-primary",
    },
  ];

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <Badge
              variant="secondary"
              className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20 mb-4"
            >
              Get In Touch
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Let's <span className="gradient-primary bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm always open to discussing new opportunities, collaborative projects, or sharing
              insights about technology and competitive programming.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="gradient-card border-border/50 shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="p-3 rounded-lg bg-background/50 text-primary group-hover:scale-110 transition-transform">
                        <info.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.action ? (
                          <a
                            href={info.action}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <h4 className="text-lg font-semibold mb-4 text-center">Find me on</h4>
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${social.color} transition-colors`}
                        >
                          <social.icon size={20} />
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Message */}
            <Card className="gradient-card border-border/50 shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Send a Message</h3>
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-primary">
                      <Send className="text-primary-foreground" size={24} />
                    </div>
                    <p className="text-muted-foreground">
                      Whether you have a project idea, want to collaborate, or just want to say
                      hello, I'd love to hear from you!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Available for:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Freelance Projects
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Collaborations
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Hackathons
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Tech Discussions
                        </Badge>
                      </div>
                    </div>

                    {/* Send Email Button */}
                    <a
                      href="mailto:amrendraramtripathibtech23-27@liet.in?subject=Want%20to%20collaborate%20with%20you"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="hero" size="lg" className="w-full group">
                        <Mail className="group-hover:rotate-12 transition-transform" />
                        Send Email
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="gradient-card border-border/50 shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's turn your ideas into reality. I'm passionate about creating innovative
                  solutions and always excited to take on new challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg">
                    Start a Project
                  </Button>
                  <Button variant="outline" size="lg">
                    View My Work
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;