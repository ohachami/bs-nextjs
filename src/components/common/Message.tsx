'use client';

import { formatDistanceDate } from '@/utils/functions';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MessageSquareReply } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { MessageIF } from '@/types/chat';
import edjsHTML from 'editorjs-html';
import styles from '@/styles/EditorOutput.module.css';

const Message: React.FC<{ message: MessageIF; onReply: () => void }> = ({
  message,
  onReply,
}) => {
  const edjsParser = edjsHTML();
  const htmlContent = edjsParser.parse(message.message);
  const [isExpend, setIsExpend] = useState(false);
  const _htmlContent = isExpend
    ? htmlContent
    : `${htmlContent.substring(0, 30)}...`;

  return (
    <div className="p-5 border rounded-lg ">
      <div>
        <div className="flex items-center gap-x-4">
          <div className="flex-none ">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://picsum.photos/200" />
              {/* TODO:change the avatar fallback with uer initial */}
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col flex-auto">
            <div className="text-sm">{message.userName}</div>
            <div className="text-xs">
              {formatDistanceDate(message.timestamp, 'fr')}
            </div>
          </div>
          <div className="flex-none">
            <Button className="p-2" variant={'outline'} onClick={onReply}>
              <MessageSquareReply size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className={`flex pt-2 ${styles.editorContent}`}>
        <div
          className="flex-1"
          dangerouslySetInnerHTML={{ __html: _htmlContent }}
        />

        <div className="flex justify-end mt-2 self-end">
          <Button
            variant="link"
            className="text-[#007BFF]"
            onClick={() => setIsExpend(!isExpend)}
          >
            {!isExpend ? 'Voir plus' : 'Voir moins'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Message;
