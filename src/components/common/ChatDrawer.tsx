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
  const replyEditorRef = useRef<EditorJS | null>(null);
  const [displayEd, setDispalyEd] = useState(false);

  // useFeedbacks();
  const feedbacks = getFeedbackMocks;

  const onEnterKeyPress = async () => {
    if (replyEditorRef && replyEditorRef.current) {
      const output: OutputData = await replyEditorRef.current.save();
      replyEditorRef.current.clear();
      console.log({ output });
    }
  };

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

  const onReply = () => {
    setDispalyEd(!displayEd);
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
            <Message message={feedbacks} onReply={onReply} />
            {displayEd && (
              <Editor
                editorRef={replyEditorRef}
                onEnter={onEnterKeyPress}
                className="ml-10 mt-3"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
