// case STEPS.TEAM_INVITES:
//       return (
//         <Form {...teamInvitesForm}>
//           <form
//             onSubmit={teamInvitesForm.handleSubmit(onTeamInvitesSubmit)}
//             className="space-y-6"
//           >
//             {teamInvitesForm.watch("invites").map((_, index) => (
//               <Card key={index}>
//                 <CardHeader>
//                   <CardTitle>Team Member {index + 1}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <FormField
//                     control={teamInvitesForm.control}
//                     name={`invites.${index}.email`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email Address</FormLabel>
//                         <FormControl>
//                           <Input {...field} type="email" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={teamInvitesForm.control}
//                     name={`invites.${index}.role`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Role</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select role" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="ADMIN">Admin</SelectItem>
//                             <SelectItem value="MEMBER">Member</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full"
//               onClick={() => {
//                 const currentInvites = teamInvitesForm.getValues("invites");
//                 teamInvitesForm.setValue("invites", [
//                   ...currentInvites,
//                   { email: "", role: "MEMBER" },
//                 ]);
//               }}
//             >
//               Add Another Team Member
//             </Button>
//             <Button type="submit" className="w-full">
//               Complete Setup
//             </Button>
//           </form>
//         </Form>
//       )
