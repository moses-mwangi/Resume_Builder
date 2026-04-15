"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { auth } from "@/lib/auth";
import {
  Check,
  Sparkles,
  FileText,
  Download,
  Briefcase,
  Star,
  Shield,
  Users,
  Zap,
  Crown,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: FileText,
      description: "Perfect for getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "1 resume template",
        "Basic PDF export", 
        "Community support",
        "Save up to 3 resumes",
        "Basic formatting options",
        "AI-powered suggestions (5/month)",
      ],
      notIncluded: [
        "Premium templates",
        "AI content suggestions",
        "Priority support",
      ],
      color: "from-gray-500 to-gray-600",
      badge: null,
    },
    {
      id: "pro",
      name: "Professional",
      icon: Briefcase,
      description: "Best for job seekers",
      monthlyPrice: 9.99,
      annualPrice: 79.99,
      features: [
        "15+ premium templates",
        "Unlimited PDF & Word exports",
        "Priority email support",
        "Unlimited resumes",
        "Unlimited AI suggestions",
        "Cover letter generator",
        "ATS-optimized formats",
        "Custom color schemes",
        "LinkedIn optimization",
        "Resume analytics",
      ],
      notIncluded: ["Team collaboration", "API access"],
      color: "from-purple-500 to-pink-500",
      badge: "Most Popular",
      popular: true,
    },
    {
      id: "business",
      name: "Business",
      icon: Users,
      description: "For teams and professionals",
      monthlyPrice: 19.99,
      annualPrice: 159.99,
      features: [
        "Everything in Professional",
        "Team collaboration (5 members)",
        "Advanced analytics dashboard",
        "API access",
        "White-label exports",
        "Custom template creation",
        "Dedicated account manager",
        "Integration with 50+ job boards",
        "Bulk resume generation",
        "Advanced ATS scoring",
      ],
      notIncluded: [],
      color: "from-amber-500 to-orange-500",
      badge: "Best Value",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Crown,
      description: "For large organizations",
      monthlyPrice: 39.99,
      annualPrice: 319.99,
      features: [
        "Everything in Business",
        "Unlimited team members",
        "99.9% uptime SLA",
        "Custom integrations",
        "On-premise deployment option",
        "24/7 phone & chat support",
        "Unlimited bulk operations",
        "Advanced recruitment dashboard",
        "Custom AI model training",
        "Compliance & security features",
      ],
      notIncluded: [],
      color: "from-emerald-500 to-teal-500",
      badge: "Ultimate",
    },
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.success("Login Required");
      router.push("/login");
      return;
    }

    setSelectedPlan(planId);
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Success!");

    setIsLoading(false);
    setSelectedPlan(null);

    // In a real app, you'd redirect to payment gateway or dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const getPrice = (plan: (typeof plans)[0]) => {
    if (plan.id === "free") return "Free";
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const period = isAnnual ? "/year" : "/month";
    return `$${price}${period}`;
  };

  const getAnnualSavings = (plan: (typeof plans)[0]) => {
    if (plan.id === "free") return null;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.annualPrice;
    const savingsPercent = Math.round((savings / monthlyTotal) * 100);
    return `Save ${savingsPercent}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ResumeForge
                </span>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-purple-600 transition"
                >
                  Dashboard
                </Link>
                <Link href="/pricing" className="text-purple-600 font-semibold">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex gap-3">
              {user ? (
                <Button variant="outline" onClick={() => auth.logout()}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <Badge
          variant="secondary"
          className="mb-4 bg-purple-100 text-purple-700"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          Simple, Transparent Pricing
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose the plan that's right for you
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start for free and upgrade anytime. No hidden fees, cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={`text-sm ${!isAnnual ? "text-gray-900 font-semibold" : "text-gray-500"}`}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-purple-600"
          />
          <span
            className={`text-sm ${isAnnual ? "text-gray-900 font-semibold" : "text-gray-500"}`}
          >
            Annual
            <Badge
              variant="secondary"
              className="ml-2 bg-green-100 text-green-700 text-xs"
            >
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = getPrice(plan);
            const savings = getAnnualSavings(plan);

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "border-2 border-purple-500 shadow-lg" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <CardHeader>
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{price}</span>
                    {plan.id !== "free" && (
                      <div className="text-sm text-green-600 mt-1">
                        {isAnnual && savings}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    className={`w-full ${
                      plan.id === "free"
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isLoading && selectedPlan === plan.id}
                  >
                    {isLoading && selectedPlan === plan.id ? (
                      "Processing..."
                    ) : plan.id === "free" ? (
                      "Get Started"
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Subscribe Now
                      </>
                    )}
                  </Button>

                  <Separator />

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-900">
                      What's included:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.length > 0 && (
                      <>
                        <div className="pt-2">
                          <p className="text-sm font-semibold text-gray-400 mb-2">
                            Not included:
                          </p>
                          {plan.notIncluded.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-400"
                            >
                              <div className="h-4 w-4 rounded-full border border-gray-300 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <p className="text-xs text-gray-400 text-center w-full">
                    {plan.id === "free"
                      ? "No credit card required"
                      : "Cancel anytime • Secure payment"}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare all features
            </h2>
            <p className="text-gray-600">
              Everything you need to create professional resumes
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 bg-purple-50">
                    Professional
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Business
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Resume Templates",
                    free: "1",
                    pro: "10+",
                    business: "20+",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "PDF Exports",
                    free: "Basic",
                    pro: "Unlimited",
                    business: "Unlimited",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "AI Content Assistant",
                    free: "❌",
                    pro: "✅",
                    business: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Cover Letter Generator",
                    free: "❌",
                    pro: "✅",
                    business: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Team Collaboration",
                    free: "❌",
                    pro: "❌",
                    business: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "API Access",
                    free: "❌",
                    pro: "❌",
                    business: "✅",
                    enterprise: "✅",
                  },
                  {
                    feature: "Priority Support",
                    free: "❌",
                    pro: "✅",
                    business: "✅",
                    enterprise: "24/7",
                  },
                  {
                    feature: "Custom Branding",
                    free: "❌",
                    pro: "❌",
                    business: "✅",
                    enterprise: "✅",
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {row.feature}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-600">
                      {row.free}
                    </td>
                    <td className="text-center py-3 px-4 text-purple-600 font-medium bg-purple-50/50">
                      {row.pro}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-600">
                      {row.business}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-600">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">Have questions? We're here to help</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              q: "Can I switch plans later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes, the Free plan is always available. Upgrade anytime to access premium features.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
            },
            {
              q: "Can I cancel my subscription?",
              a: "Absolutely! You can cancel anytime from your account settings. No questions asked.",
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 14-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime.",
            },
            {
              q: "Is my data secure?",
              a: "Yes, we use bank-level encryption to protect your data. We never share your information.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-gray-900 flex items-start gap-2">
                <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                {faq.q}
              </h3>
              <p className="text-gray-600 pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your perfect resume?
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            Join thousands of professionals who landed their dream jobs with
            ResumeForge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/dashboard" : "/register"}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                {user ? "Go to Dashboard" : "Get Started Free"}
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
