import clsx from "clsx";

export function Prose<T extends React.ElementType = "div">({
  as,
  className,
  ...props
}: React.ComponentPropsWithoutRef<T> & {
  as?: T;
}) {
  let Component = as ?? "div";

  return (
    <Component
      className={clsx(
        className,
        "prose prose-slate max-w-none dark:prose-invert dark:text-slate-400",
        //h1
        "prose-h1:mt-0 prose-h1:mb-8 prose-h1:text-4xl prose-h1:font-cal prose-h1:font-semibold",
        // headings
        "prose-headings:scroll-mt-28 prose-headings:font-cal prose-headings:font-semibold lg:prose-headings:scroll-mt-[8.5rem]",
        // lead
        "prose-lead:text-slate-500 dark:prose-lead:text-slate-400",
        // links
        "prose-a:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400",
        // link underline - simplified and elegant
        "prose-a:no-underline prose-a:relative",
        "prose-a:after:absolute prose-a:after:bottom-0 prose-a:after:left-0",
        "prose-a:after:h-[1px] prose-a:after:w-full",
        "prose-a:after:bg-blue-600 dark:prose-a:after:bg-blue-400",
        "prose-a:after:opacity-25 hover:prose-a:after:opacity-100",
        "prose-a:after:transition-opacity prose-a:after:duration-150",
        // pre
        "prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10",
        // hr
        "dark:prose-hr:border-slate-800",
      )}
      {...props}
    />
  );
}