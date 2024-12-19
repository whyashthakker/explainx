import clsx from "clsx";
import Image from "next/image";

const featuredTestimonial = {
  body: "Best Deal and on Great price: I recently tried out Olly, and I must say I was pleasantly surprised by the experience. Olly offers some of the best features at great prices, which are truly great. I found exactly what I was looking for at a fantastic price, and I absolutely loved it. Overall, a great tool.",
  author: {
    name: "AppSumo User",
    handle: "106812663271318157415",
    imageUrl:
      "/tacos-appsumo-black.png",
    logoUrl: "/tacos-appsumo-black.png",
  },
};

const testimonials: {
  body: string;
  author: {
    name: string;
    handle: string;
    imageUrl: string;
  };
}[][][] = [
  [
    [
      {
        body: "Congratulations on the launch. Just got myself a lifetime subscription. Its helping me summarise the post better for now, whereas i am keeping my own views.",
        author: {
          name: "Aman Sharma",
          handle: "amanintech",
          imageUrl:
            "https://ph-avatars.imgix.net/2179893/0b68c40a-0596-4222-bb92-03b99c41bb4e.png",
        },
      },
      {
        body: "Congratulations on the launch! This tool could be a gamechanger for any SMM agency or any business looking to boost their engagement with users/audience online without having to allocate limited time and resources to it.",
        author: {
          name: "Roberto Perez",
          handle: "rockyperezz",
          imageUrl:
            "https://ph-avatars.imgix.net/6212118/e65b8927-e1df-4197-a6ea-c75f1c20ee6f.gif",
        },
      },
      {
        body: "Love the pay what you use business model, as a user. Not sure how scalable that will turn out to be from a business perspective ... but that's not my problem I guess! Great work team, hope you make it to the top",
        author: {
          name: "Florian Myter",
          handle: "florian_myter",
          imageUrl:
            "https://ph-avatars.imgix.net/5413468/c0037336-08b0-4570-9375-0ea68c9b2563.png",
        },
      },
    ],
    [
      {
        body: `Best for LinkedIn: Right from the first comment that Olly crafted, I knew I would be using it for all of my socials. I especially love how it writes on LinkedIn. I only wish if I could avoid highlighting the content before it can write a comment..and make the tone and purpose available more intuitively? Even without those features, this is a steal!`,
        author: {
          name: "AppSumo User",
          handle: "jazzyb9090",
          imageUrl:
            "https://appsumo2-cdn.appsumo.com/media/users/avatars/image-1244211669559.jpg?width=256&height=256&aspect_ratio=1:1",
        },
      },
    ],
  ],
  [
    [
      {
        body: "Actually, a very useful product for those who do active social media marketing. Congratulations on the launch!",
        author: {
          name: "Alex Egorov",
          handle: "alex_egorov",
          imageUrl:
            "https://ph-avatars.imgix.net/3695082/53ef7bc8-b0d2-40c0-96df-1873caf289d9.gif",
        },
      },
      {
        body: "Congratulations, @goyashy! The virality score feature caught my eye. I envision this tool as a valuable resource to enhance the quality of written posts, making it essential for content creators.",
        author: {
          name: "Chirag",
          handle: "chiragshelar",
          imageUrl:
            "https://ph-avatars.imgix.net/6429993/c24d940d-c5c0-4ca9-903f-0e5e91a2b8ea.png",
        },
      }
    ],
    [
      {
        body: "It's really awesome to see a tool that makes commenting this easy.",
        author: {
          name: "Mike Wakoz",
          handle: "mike_wakoz",
          imageUrl:
            "https://ph-avatars.imgix.net/5873417/8599ac4a-12c3-476d-8e1a-e1c78f9e786e.jpeg",
        },
      },
      {
        body: `congratulation Yash Olly is prefect example of best use of Ai keep it up bro..`,
        author: {
          name: "Jawad Naeem",
          handle: "jawadnaeem243",
          imageUrl:
            "https://ph-avatars.imgix.net/6557527/18bf441a-1347-4969-a7ad-95fe4352cea5.jpeg",
        },
      },
    ],
  ],
];

// const testimonials: {
//     body: string;
//     author: {
//       name: string;
//       handle: string;
//       imageUrl: string;
//     };
//   }[][][] = UserReviewsData.map((reviewData) => [
//     [
//       {
//         body: reviewData.review,
//         author: {
//           name: reviewData.reviewerName,
//           handle: reviewData.userName || "",
//           imageUrl: reviewData.userImage || "",
//         },
//       },
//     ],
//   ]);
  

export function Testimonials() {
  return (
    <div className="relative isolate bg-white pb-20 pt-24 sm:pt-32" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-teal-500">
            Wall of Love ❤️
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            loved by 1000+ users
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <Image
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={featuredTestimonial.author.imageUrl}
                alt=""
                width={40}
                height={40}
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
              </div>
              <Image
                className="h-8 w-auto flex-none"
                src={featuredTestimonial.author.logoUrl}
                alt=""
                height={32}
                width={98}
                unoptimized
              />
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={clsx(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8",
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                    >
                      <blockquote className="text-gray-900">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <Image
                          className="h-10 w-10 rounded-full bg-gray-50"
                          src={testimonial.author.imageUrl}
                          alt=""
                          width={40}
                          height={40}
                        />
                        <div>
                          <div className="font-semibold">
                            {testimonial.author.name}
                          </div>
                          {testimonial.author.handle ? (
                            <div className="text-gray-600">
                              @{testimonial.author.handle}
                            </div>
                          ) : undefined}
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
