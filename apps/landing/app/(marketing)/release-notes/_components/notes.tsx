import React from 'react';
import { CalendarIcon, CheckIcon, ClockIcon, StarIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import { releaseData } from '../../../../data/release-notes';

const ReleaseNoteTimeline = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Release Notes</h2>
          <p className="mt-2 text-muted-foreground">Stay up-to-date with the latest features and improvements in our product.</p>
        </div>
        <div className="relative border-l border-muted-foreground/20 pl-6">
          <div className="absolute left-0 top-0 -ml-[9px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <StarIcon className="h-4 w-4" />
          </div>
          <div className="grid gap-8">
            {releaseData.map((release, index) => (
              <div key={release.version} className={`grid gap-1.5 ${release.isFuture ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {release.isFuture ? (
                    <ClockIcon className="h-4 w-4" />
                  ) : (
                    <CalendarIcon className="h-4 w-4" />
                  )}
                  <span>{release.date} {release.time ? release.time : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-md px-2 py-1 text-xs font-medium ${release.isFuture ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>
                    v{release.version}
                  </div>
                  <h3 className="text-xl font-semibold">{release.isFeatured ? <StarIcon width={12} height={12} className='text-orange-400' /> : ""}</h3>
                  {release.video && (
                    <Link href={release.video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                      <VideoIcon className="h-4 w-4" />
                      <span className="text-sm">Release Video</span>
                    </Link>
                  )}
                </div>
                <ul className="grid gap-2 text-muted-foreground">
                  {release.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckIcon className={`h-4 w-4 mt-1 flex-shrink-0 ${release.isFuture ? 'text-muted-foreground' : 'text-green-500'}`} />
                      <div>
                        <span className={`font-medium ${release.isFuture ? 'text-muted-foreground' : 'text-foreground'}`}>{feature.title}</span>
                        {(release.isFeatured || release.isFuture) && <p className="mt-0.5">{feature.description}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseNoteTimeline;