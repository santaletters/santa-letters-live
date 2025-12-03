import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { X, Gift, CreditCard, CheckCircle2 } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { EmbeddedPaymentForm } from "./EmbeddedPaymentForm";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SIHQT2NsH2CKfRANHrn5PsrTTnvRY0t5QStLGW8W3ihy4dhFVhDX4ZIP3lrOYhA1HPtnflUgDAhDxEZ0TgNB1V000lsmZhQBB';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const santaMagicalJourneyProduct = "https://images.unsplash.com/photo-1699369398947-f3779c75bbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50YSUyMG1hZ2ljYWwlMjBqb3VybmV5JTIwYm9va3xlbnwxfHx8fDE3NjM3NjIzODB8MA&ixlib=rb-4.1.0&q=80&w=1080";

interface SubscriptionUpsellModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  orderToken: string;
  numberOfChildren: number;
}

export function SubscriptionUpsellModal({ 
  isOpen, 
  onAccept, 
  onDecline, 
  orderToken,
  numberOfChildren 
}: SubscriptionUpsellModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const monthlyPrice = numberOfChildren * 12;

  const handleYesClick = async () => {
    setShowPaymentForm(true);
    setIsProcessing(true);

    try {
      // Create payment intent for subscription
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-af14e976/upsell/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            orderToken,
            upsellId: 'subscription_magical_journey',
            upsellName: "Santa's Magical Journey",
            quantity: numberOfChildren,
            price: 12.00,
            isSubscription: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create subscription payment');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating subscription payment:', error);
      alert('Failed to start subscription process. Please try again.');
      setShowPaymentForm(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onAccept();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0" onInteractOutside={(e) => e.preventDefault()}>
        {paymentSuccess ? (
          <div className="p-8 text-center">
            <div className="mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontWeight: '700', fontFamily: 'Pacifico' }}>
              🎅 Subscription Activated!
            </h3>
            <p className="text-gray-700">
              Your monthly letters from Santa are all set! Redirecting...
            </p>
          </div>
        ) : (
          <>
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <button
                onClick={onDecline}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <h2 className="text-3xl mb-2" style={{ fontFamily: 'Pacifico' }}>
                  🎁 Wait! Special Offer! 🎁
                </h2>
                <p className="text-xl text-white/90">
                  Get 2 FREE Bonus Gifts!
                </p>
              </div>
            </div>

            <div className="p-6">
              {/* Product Image */}
              <div className="flex justify-center mb-4">
                <img 
                  src={santaMagicalJourneyProduct} 
                  alt="Santa's Magical Journey" 
                  className="w-full max-w-md h-auto object-contain rounded-lg"
                />
              </div>

              {/* Offer Details */}
              <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 mb-4">
                <h3 className="text-2xl text-center mb-4" style={{ fontWeight: '700', color: '#9333ea' }}>
                  Santa's Magical Journey
                </h3>
                <div className="text-center mb-4">
                  <div className="text-5xl text-purple-600 mb-2" style={{ fontFamily: 'Pacifico' }}>
                    ${monthlyPrice}/month
                  </div>
                  <p className="text-sm text-gray-600">
                    for {numberOfChildren} {numberOfChildren === 1 ? 'child' : 'children'} • cancel anytime
                  </p>
                </div>

                {/* 2 FREE Bonus Gifts */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-4 mb-4">
                  <p className="text-center mb-2" style={{ fontWeight: '700', color: '#16a34a' }}>
                    ✨ Your 2 FREE Bonus Gifts (Value: $19.98):
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">🎄 Santa's Workshop VIP Badge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">🎅 Nice List Gold Pass</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-600 mt-3">
                    Both authorized with a personalized Autographed Photo of Santa!
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Monthly personalized letters from Santa</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Keep the magic alive all year long</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">$0 charged today - First billing: January 5th, 2026</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Cancel anytime with no hassle</span>
                  </div>
                </div>
              </div>

              {/* Payment Form or Buttons */}
              {showPaymentForm && clientSecret ? (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-yellow-700" />
                    <h4 style={{ fontWeight: '700' }} className="text-yellow-900">Secure Payment Required</h4>
                  </div>
                  <p className="text-sm text-yellow-800 mb-4">
                    Complete your payment to activate your monthly subscription. You will be charged $0 today. Your first payment of ${monthlyPrice.toFixed(2)} will be on January 5th, 2026.
                  </p>
                  <Elements stripe={stripePromise}>
                    <EmbeddedPaymentForm
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      onError={(error) => {
                        console.error('Payment error:', error);
                        alert('Payment failed. Please try again.');
                        setShowPaymentForm(false);
                        setClientSecret(null);
                      }}
                    />
                  </Elements>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleYesClick}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Loading Payment...
                      </>
                    ) : (
                      <>🎅 YES! Start Monthly Letters ($0 Today - Billing Starts Jan 5th)</>
                    )}
                  </Button>
                  
                  <Button
                    onClick={onDecline}
                    variant="outline"
                    className="w-full border-2 border-gray-300 text-gray-700"
                  >
                    No Thanks, Continue to My Order
                  </Button>
                </div>
              )}

              <p className="text-xs text-center text-gray-500 mt-4">
                By clicking "YES", you agree to subscribe to monthly letters at ${monthlyPrice}/month starting January 5th, 2026. Cancel anytime.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
