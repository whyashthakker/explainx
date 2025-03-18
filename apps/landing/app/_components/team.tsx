const members = [
  {
      name: 'Yash Thakker',
      role: 'CEO & Product Lead',
      avatar: 'https://github.com/shadcn.png',
      expertise: ['AI Strategy', 'Product Development', 'Enterprise Solutions'],
  },
  {
      name: 'Geeta Thakker',
      role: 'CMO & Operations',
      avatar: 'https://github.com/shadcn.png',
      expertise: ['AI Operations', 'Business Strategy', 'Team Management'],
  },
  {
      name: 'Aryan Nagbanshi',
      role: 'Development',
      avatar: 'https://github.com/shadcn.png',
      expertise: ['Machine Learning', 'AI Architecture', 'Backend Systems'],
  },
  {
      name: 'Pratham Ware',
      role: 'Marketing',
      avatar: 'https://github.com/shadcn.png',
      expertise: ['AI Marketing', 'Content Strategy', 'Growth'],
  },
  {
      name: 'Shri Jadhav',
      role: 'AI Solutions Expert',
      avatar: 'https://github.com/shadcn.png',
      expertise: ['Client Solutions', 'AI Integration', 'Support'],
  },
  {
      name: 'Yogesh Gaikwad',
      role: 'Content',
      avatar: 'https://github.com/shadcn.png',
      expertise: ['AI Content', 'Video Production', 'Creative Direction'],
  },
]

export default function TeamSection() {
  return (
      <section className="py-12 md:py-32">
          <div className="mx-auto max-w-3xl px-8 lg:px-0">
              <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">Our Team</h2>
              
              <div>
                  <h3 className="mb-6 text-lg font-medium">Leadership</h3>
                  <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                      {members.slice(0, 2).map((member, index) => (
                          <MemberCard key={index} member={member} />
                      ))}
                  </div>
              </div>

              <div className="mt-6">
                  <h3 className="mb-6 text-lg font-medium">Engineering</h3>
                  <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                      {members.slice(2, 3).map((member, index) => (
                          <MemberCard key={index} member={member} />
                      ))}
                  </div>
              </div>

              <div className="mt-6">
                  <h3 className="mb-6 text-lg font-medium">Marketing</h3>
                  <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                      {members.slice(3).map((member, index) => (
                          <MemberCard key={index} member={member} />
                      ))}
                  </div>
              </div>
          </div>
      </section>
  );
}

function MemberCard({ member }: { member: any }) {
  return (
      <div>
          <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
              <img className="aspect-square rounded-full object-cover" src={member.avatar || 'https://via.placeholder.com/150'} alt={member.name} height="460" width="460" loading="lazy" />
          </div>
          <span className="mt-2 block text-sm font-semibold">{member.name}</span>
          <span className="text-muted-foreground block text-xs">{member.role}</span>
          <ul className="text-xs text-muted-foreground mt-1">
              {member.expertise.map((exp : string, idx : number) => (
                  <li key={idx}>• {exp}</li>
              ))}
          </ul>
      </div>
  );
}
