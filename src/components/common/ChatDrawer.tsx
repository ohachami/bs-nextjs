'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import React, { useRef, useState } from 'react';
import { Send, XIcon } from 'lucide-react';
import Message from '@/components/common/Message';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Editor from '@/components/common/Editor';
import { Button } from '@/components/ui/button';

import { getFeedbackMocks } from '@/utils/mocks';
// import { useFeedbacks } from '@/services/feedbacks.service';

export default function ChatDrawer() {
  const [isOpen, setIsOpen] = useState(true); // default to false
  const editorRef = useRef<EditorJS | null>(null);
  // useFeedbacks();
  const feedbacks = getFeedbackMocks;

  console.log({ feedbacks: feedbacks.message });

  const onCloseSheet = () => {
    setIsOpen(false);
  };

  const onSaveFeedBack = async () => {
    if (editorRef && editorRef.current) {
      const output: OutputData = await editorRef.current.save();
      editorRef.current.clear();
      console.log(output);
    }
  };
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col gap-y-8 min-w-[613px]">
          <div>
            <SheetHeader>
              <SheetTitle>Envoyer un feedback</SheetTitle>
              <SheetDescription>
                Votre destinataire recevra ce commentaire et fera des mises à
                jour importantes.
              </SheetDescription>
            </SheetHeader>
          </div>

          <Editor editorRef={editorRef} />

          <div className="flex justify-between">
            <Button variant="outline" onClick={onCloseSheet}>
              <XIcon />
              Fermer
            </Button>
            <Button variant="outline" onClick={onSaveFeedBack}>
              Envoyer
              <Send />
            </Button>
          </div>
          <div className="overflow-auto flex flex-col gap-y-2">
            <Message message={feedbacks} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
