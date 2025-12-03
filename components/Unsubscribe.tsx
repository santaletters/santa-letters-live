import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface UnsubscribeProps {
  onBack?: () => void;
}

export function Unsubscribe({ onBack }: UnsubscribeProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("no_longer_interested");

  // Check if email is in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/email/unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, reason }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("You have been successfully unsubscribed from all emails.");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to unsubscribe. Please try again.");
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          {status === "success" ? (
            // Success State
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl mb-4" style={{ fontWeight: "700", color: "#16a34a" }}>
                  Unsubscribe Successful
                </h1>
                <p className="text-gray-700 text-lg mb-2">{message}</p>
                <p className="text-gray-600">
                  Email: <span style={{ fontWeight: "600" }}>{email}</span>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <span style={{ fontWeight: "600" }}>Note:</span> You will no longer receive
                  marketing emails from us. You may still receive transactional emails related to
                  your orders.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">Changed your mind?</p>
                <Button
                  onClick={() => {
                    setStatus("idle");
                    setMessage("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Re-subscribe
                </Button>

                {onBack && (
                  <Button onClick={onBack} variant="ghost" className="w-full">
                    ← Back to Home
                  </Button>
                )}
              </div>
            </div>
          ) : (
            // Unsubscribe Form
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl mb-4" style={{ fontWeight: "700" }}>
                  Unsubscribe from Emails
                </h1>
                <p className="text-gray-600">
                  We're sorry to see you go! Enter your email address below to unsubscribe from all
                  marketing emails.
                </p>
              </div>

              <form onSubmit={handleUnsubscribe} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block mb-2" style={{ fontWeight: "600" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Reason Selection */}
                <div>
                  <label htmlFor="reason" className="block mb-2" style={{ fontWeight: "600" }}>
                    Why are you unsubscribing? (Optional)
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="no_longer_interested">No longer interested</option>
                    <option value="too_many_emails">Receiving too many emails</option>
                    <option value="never_signed_up">I never signed up for this</option>
                    <option value="spam">Emails are spam</option>
                    <option value="other">Other reason</option>
                  </select>
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  style={{ fontWeight: "600" }}
                >
                  {status === "loading" ? "Processing..." : "Unsubscribe"}
                </Button>

                {/* Cancel Button */}
                {onBack && (
                  <Button
                    type="button"
                    onClick={onBack}
                    variant="ghost"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                )}
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  By unsubscribing, you will no longer receive promotional emails. You may still
                  receive important transactional emails related to your orders and account.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Help Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:support@santascertifiedletter.com"
              className="text-blue-600 hover:underline"
            >
              support@santascertifiedletter.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
