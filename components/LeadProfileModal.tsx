import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Mail, Phone, Calendar, MessageCircle, Copy, RefreshCw, X } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orderToken?: string;
  createdAt: string;
  updatedAt?: string;
  status: string;
  responses: {
    messages?: Array<{
      timestamp: string;
      user: string;
      ai: string;
    }>;
    firstMessage?: string;
  };
  conversationHistory?: any[];
  parsedData?: {
    autoInsurance?: string;
    homeownerStatus?: string;
    debtSituation?: string;
    electricityInterest?: string;
    newCarPlans?: string;
    seniorStatus?: string;
    workSituation?: string;
    benefits?: string;
    location?: string;
    householdSize?: string;
    customQuestions?: Array<{ question: string; answer: string }>;
  };
}

interface LeadProfileModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export function LeadProfileModal({ lead, isOpen, onClose, onRefresh }: LeadProfileModalProps) {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Auto-refresh every 5 seconds if enabled
  useEffect(() => {
    if (!autoRefresh || !isOpen || !lead) return;

    const interval = setInterval(() => {
      if (onRefresh) {
        onRefresh();
        setLastRefresh(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, isOpen, lead, onRefresh]);

  if (!lead) return null;

  const parsedData = lead.parsedData || {};
  const messages = lead.responses?.messages || [];
  const hasCustomQuestions = parsedData.customQuestions && parsedData.customQuestions.length > 0;

  const copyAllInfo = () => {
    const info = `
LEAD PROFILE - ${lead.name}
========================
Email: ${lead.email}
Phone: ${lead.phone || "N/A"}
Status: ${lead.status}
Created: ${new Date(lead.createdAt).toLocaleString()}
Order Token: ${lead.orderToken || "N/A"}

QUALIFICATION RESPONSES:
========================
Auto Insurance Interest: ${parsedData.autoInsurance || "Not answered"}
Homeowner Status: ${parsedData.homeownerStatus || "Not answered"}
Debt Situation: ${parsedData.debtSituation || "Not answered"}
Electricity/Utility Savings: ${parsedData.electricityInterest || "Not answered"}
New Car Plans: ${parsedData.newCarPlans || "Not answered"}
Senior Status (55+): ${parsedData.seniorStatus || "Not answered"}
Work Situation: ${parsedData.workSituation || "Not answered"}
Benefits/Assistance: ${parsedData.benefits || "Not answered"}
Location: ${parsedData.location || "Not answered"}
Household Size: ${parsedData.householdSize || "Not answered"}

FULL CHAT LOG:
========================
${messages.map(msg => `[${new Date(msg.timestamp).toLocaleString()}]\nCustomer: ${msg.user}\nAssistant: ${msg.ai}\n`).join('\n')}

${hasCustomQuestions ? `\nCUSTOM QUESTIONS/RESPONSES:\n========================\n${parsedData.customQuestions?.map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n')}` : ''}
    `.trim();

    navigator.clipboard.writeText(info);
    alert("Lead profile copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Lead Profile: {lead.name}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={copyAllInfo}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
              <Button
                onClick={() => {
                  setAutoRefresh(!autoRefresh);
                }}
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                {autoRefresh ? "Auto-Refresh ON" : "Auto-Refresh OFF"}
              </Button>
            </div>
          </div>
          {autoRefresh && (
            <p className="text-xs text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()} • Refreshes every 5 seconds
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Contact Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-medium">{lead.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <p className="font-medium">{lead.phone || "N/A"}</p>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <p className="font-medium">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <Badge className="ml-2">{lead.status}</Badge>
              </div>
            </div>
          </Card>

          {/* Qualification Data Points */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">📊 Qualification Data Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <DataPoint label="Auto Insurance Interest" value={parsedData.autoInsurance} />
              <DataPoint label="Homeowner Status" value={parsedData.homeownerStatus} />
              <DataPoint label="Debt Situation" value={parsedData.debtSituation} />
              <DataPoint label="Electricity/Utility Savings" value={parsedData.electricityInterest} />
              <DataPoint label="New Car Plans" value={parsedData.newCarPlans} />
              <DataPoint label="Senior Status (55+)" value={parsedData.seniorStatus} />
              <DataPoint label="Work Situation" value={parsedData.workSituation} />
              <DataPoint label="Benefits/Assistance" value={parsedData.benefits} />
              <DataPoint label="Location (State)" value={parsedData.location} />
              <DataPoint label="Household Size" value={parsedData.householdSize} />
            </div>
          </Card>

          {/* Custom Questions */}
          {hasCustomQuestions && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">❓ Custom Questions & Responses</h3>
              <div className="space-y-3">
                {parsedData.customQuestions?.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-700 mb-1">Q: {item.question}</p>
                    <p className="text-sm text-gray-900">A: {item.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Full Chat Log */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Full Chat Log ({messages.length} messages)
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-sm">No messages yet</p>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white rounded-2xl px-4 py-2 max-w-[80%]">
                        <p className="text-xs opacity-75 mb-1">{new Date(msg.timestamp).toLocaleString()}</p>
                        <p className="text-sm">{msg.user}</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-[80%]">
                        <p className="text-sm">{msg.ai}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DataPoint({ label, value }: { label: string; value?: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">
        {value || <span className="text-gray-400 italic">Not answered</span>}
      </p>
    </div>
  );
}
