'use client';

import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
import LinkTool from '@editorjs/link';
import AttachesTool from '@editorjs/attaches';
import SimpleImage from '@editorjs/simple-image';
import MentionTool from 'editorjs-mention-tool';
import 'editorjs-mention-tool/src/styles.css';

// import { useUsers } from '@/services/users.service';
// import { User } from '@/types/user';

type Props = {
  editorRef: React.MutableRefObject<EditorJS | null>;
  onEnter?: () => void;
  className?: string;
};

const Editor: React.FC<Props> = ({ editorRef, onEnter, className }) => {
  const editorId = useRef(uuidv4());
  // const { data } = useUsers();

  const handelEscapePrerss = () => {
    if (editorRef && editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
  };

  const handelShortcuts = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    switch (event.key) {
      case 'Enter':
        if (!event.shiftKey) {
          onEnter?.();
        }
        break;
      case 'Escape':
        event.preventDefault();
        handelEscapePrerss();
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   const mention = new MentionTool({
  //     holder: 'editorHolder', // This is the editor Holder ( see below )
  //     accessKey: '$', // Access key ( $ or @ )
  //     allUsers: [
  //       // The array with the data you want to show when the users type $
  //       {
  //         id: '1234',
  //         name: 'Variable 1',
  //         slug: 'variable1',
  //       },
  //       {
  //         id: '12345',
  //         name: 'Thing of v1',
  //         slug: 'variable1.something',
  //       },
  //     ],
  //     baseUrl: '',
  //     searchAPIUrl: '',
  //   });
  // }, []);

  useEffect(() => {
    if (!editorRef?.current) {
      const editor = new EditorJS({
        holder: editorId.current,
        inlineToolbar: true,
        tools: {
          mention: {
            class: MentionTool,
            inlineToolbar: true,
            config: {
              accessKey: '@',
              allUsers: [
                { id: '1', name: 'User 1', avatar: 'user1.jpg' },
                { id: '2', name: 'User 2', avatar: 'user2.jpg' },
                { id: '3', name: 'User 3', avatar: 'user3.jpg' },
              ],
              // suggestions: (query: string) => {
              //   return data
              //     .filter(
              //       (user: User) =>
              //         user.firstName
              //           .toLowerCase()
              //           .includes(query.toLowerCase()) ||
              //         user.lastName.toLowerCase().includes(query.toLowerCase())
              //     )
              //     .map((user: User) => ({
              //       id: user.id,
              //       title: user.firstName + user.lastName,
              //       avatar: user.profileImage,
              //     }));
              // },
            },
          },
          header: Header,
          image: SimpleImage,
          attaches: {
            class: AttachesTool,
            config: {},
          },
          linkTool: {
            class: LinkTool,
            config: {},
          },
          list: EditorjsList,
        },
        placeholder:
          ' Veuillez inclure toutes les informations pertinentes à votre contribution.',
      });
      editorRef.current = editor;
    }
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [editorRef]);

  return (
    <div
      className={cn(
        'editor-container border rounded-lg h-28 overflow-auto p-2 ',
        className
      )}
      id={editorId.current}
      onKeyDown={handelShortcuts}
    ></div>
  );
};

Editor.displayName = 'Editor';

export default Editor;
