'use client';

import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/functions';
import { Nullable } from '@/utils/types';
import {
  ArrowBigDown,
  ArrowBigUp,
  Compass,
  EllipsisVertical,
  MessageCircle,
  Send,
  Workflow,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { ReactionButton } from '../ui/ReactionButton';
import { Button } from '../ui/button';
import CloneScenarioButton from '../scenarisation/CloneScenario';

type Pair = {
  key: string;
  value: Nullable<number> | Nullable<string>;
};

type Props = {
  scenario: {
    id: string;
    creator: Nullable<string>;
    creationDate: Nullable<Date>;
    name: string;
    type: Nullable<number>;
    published: Nullable<boolean>;
    topList: Nullable<Pair[]>;
    bottomList: Nullable<Pair[]>;
    likes: number;
    dislikes: number;
    comments: number;
    liked: boolean;
    disliked: boolean;
  };
};

const GridPairs: React.FC<{ pairs: Pair[]; type: number }> = ({
  pairs,
  type,
}) => {
  return (
    <div
      className={cn(
        type === 1 ? 'grid gap-1 grid-cols-2' : 'grid gap-4 grid-cols-4'
      )}
    >
      {pairs.map((item, index) => (
        <div key={index} className="flex flex-col">
          <span
            className={cn(
              'text-sm font-medium',
              //   TODO: add colors when the rules are defined
              'text-gray-400'
            )}
          >
            {item.key}
          </span>
          <span
            className={cn(
              'text-lg font-bold',
              item.value === 0
                ? 'text-red-500'
                : item.value === 100
                  ? 'text-primary'
                  : 'text-gray-500'
            )}
          >
            {type === 2 ? `${item.value}%` : item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

type FooterProps = {
  scenarioId: string;
  scenarioName: string;
  published: Nullable<boolean>;
  like: {
    count: number;
    active: boolean;
    Onlike: () => void;
  };
  dislike: {
    count: number;
    active: boolean;
    OnDislike: () => void;
  };
  comment: {
    count: number;
    OnComment: () => void;
  };
};

const ScenarioFooter: React.FC<FooterProps> = (props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-left">
        {props.published && (
          <ReactionButton
            Icon={ArrowBigUp}
            active={props.like.active}
            color="text-green-500"
            count={props.like.count}
            onClick={props.like.Onlike}
          />
        )}
        {props.published && (
          <>
            <ReactionButton
              Icon={ArrowBigDown}
              active={props.dislike.active}
              color="text-red-500"
              count={props.dislike.count}
              onClick={props.dislike.OnDislike}
            />

            <ReactionButton
              Icon={MessageCircle}
              active={false}
              color="text-green-500"
              count={props.comment.count}
              onClick={props.comment.OnComment}
            />
          </>
        )}
      </div>
      <div className="flex items-center justify-left ">
        {/* share copy 3dots */}
        <Button variant="ghost">
          <Send />
        </Button>
        <CloneScenarioButton
          scenarioId={props.scenarioId}
          scenarioName={props.scenarioName}
        />
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
};

const ScenarioCard: React.FC<Props> = (props) => {
  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {/* type 0: exloration scenario, type 1: exploitation scenario */}

        {props.scenario.type === 0 ? (
          <Compass
            className={cn(
              'size-6',
              props.scenario.published ? 'text-primary' : 'text-gray-300'
            )}
          />
        ) : (
          <Workflow
            className={cn(
              'size-6',
              props.scenario.published ? 'text-primary' : 'text-gray-300'
            )}
          />
        )}

        <div className="grow flex flex-col">
          <p className="font-geist text-foreground leading-5 text-xs font-semibold">
            {props.scenario.creator}
          </p>
          {props.scenario.creationDate && (
            <p className="font-geist text-muted-foreground leading-5 text-[10px] font-normal">
              crée le {formatDate(props.scenario.creationDate)}
            </p>
          )}
        </div>

        {props.scenario.published && (
          <Badge
            variant="outline"
            className="rounded-full bg-primary text-white font-geist font-semibold h-5"
          >
            Publié
          </Badge>
        )}
      </div>

      <h3 className="font-geist font-semibold text-xl pb-2">
        {props.scenario.name}
      </h3>
      <div className="flex flex-col ">
        <GridPairs pairs={props.scenario.topList || []} type={1} />
        <GridPairs pairs={props.scenario.bottomList || []} type={2} />
      </div>

      <ScenarioFooter
        scenarioId={props.scenario.id}
        scenarioName={props.scenario.name}
        published={props.scenario.published}
        like={{
          count: props.scenario.likes,
          active: props.scenario.liked,
          Onlike: () => console.log('like'),
        }}
        dislike={{
          count: props.scenario.dislikes,
          active: props.scenario.disliked,
          OnDislike: () => console.log('dislike'),
        }}
        comment={{
          count: props.scenario.comments,
          OnComment: () => console.log('comment'),
        }}
      />
    </div>
  );
};

export default ScenarioCard;
