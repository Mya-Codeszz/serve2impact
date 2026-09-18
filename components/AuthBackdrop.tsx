import Image from 'next/image';
import PageShell from '@/components/PageShell';

/**
 * Shared layout for the Log in / Sign up pages.
 *  - green blob anchored to the bottom-left corner of the page
 *  - purple blob sitting behind the auth card
 * Both are purely decorative, so they're aria-hidden and ignore pointer events.
 */
export default function AuthBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-leaf-light/60">
      {/* Green blob — bottom-left corner */}
      <Image
        src="/auth/green-blob.png"
        alt=""
        aria-hidden
        width={383}
        height={298}
        priority
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-[240px] select-none sm:w-[320px] lg:w-[420px]"
      />

      {/* min-h keeps the blob at the bottom of the viewport on tall screens (76px = navbar) */}
      <div className="relative z-10 flex min-h-[calc(100vh-76px)] items-center py-8">
        <div className="w-full">
          <PageShell narrow>
            <div className="relative">
              {/* Purple blob — centered behind the card, peeking out on both sides */}
              <Image
                src="/auth/purple-blob.png"
                alt=""
                aria-hidden
                width={570}
                height={233}
                priority
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[560px] max-w-none -translate-x-1/2 -translate-y-1/2 select-none sm:w-[760px]"
              />
              <div className="relative z-10">{children}</div>
            </div>
          </PageShell>
        </div>
      </div>
    </div>
  );
}
