'use client';

import { Card } from "@/components/ui/card";
import { Settings } from 'lucide-react';

function LoadingOverlay({ isOpen = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-8 flex flex-col items-center gap-4">
        <div className="relative animate-spin">
          <Settings className="w-12 h-12 text-blue-500" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500" />
        </div>
        <p className="text-lg text-gray-600">Please wait... AI Working on your course</p>
      </Card>
    </div>
  );
}

export default LoadingOverlay;
