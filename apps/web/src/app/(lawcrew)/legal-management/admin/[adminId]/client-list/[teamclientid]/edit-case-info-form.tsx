// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import FormField from "@/components/shared/form-field";
// import { Input } from "@/components/ui/input";
// import {
//   FileText,
//   Gavel,
//   Scale,
//   Briefcase,
//   Landmark,
//   Hammer,
//   Heart,
//   Home,
//   Copyright,
//   Leaf,
//   DollarSign,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   ArrowUp,
//   ArrowDown,
//   Circle,
//   Loader2,
//   Handshake,
//   BookmarkCheck,
//   Sword
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { editCaseDetailsSchema, EditCaseDetailsType } from "@lawcrew/schema";

// interface EditClientFormProps {
//   setOpen: (open: boolean) => void;
//   case: EditCaseDetailsType;
// }

// const PRACTICE_AREA_ICONS = {
//   CRIMINAL: <Gavel className="h-4 w-4" />,
//   CIVIL: <Scale className="h-4 w-4" />,
//   COMMERCIAL: <Briefcase className="h-4 w-4" />,
//   ADMINISTRATIVE: <Landmark className="h-4 w-4" />,
//   LABOR: <Hammer className="h-4 w-4" />,
//   FAMILY: <Heart className="h-4 w-4" />,
//   REAL_ESTATE: <Home className="h-4 w-4" />,
//   INTELLECTUAL_PROPERTY: <Copyright className="h-4 w-4" />,
//   ENVIRONMENTAL: <Leaf className="h-4 w-4" />,
//   TAXATION: <DollarSign className="h-4 w-4" />,
// };

// const STATUS_ICONS = {
//   OPEN: <Circle className="h-4 w-4 text-blue-500" />,
//   CLOSED: <CheckCircle className="h-4 w-4 text-green-500" />,
//   PENDING: <Clock className="h-4 w-4 text-yellow-500" />,
// };

// const PRIORITY_ICONS = {
//   HIGH: <ArrowUp className="h-4 w-4 text-red-500" />,
//   MEDIUM: <ArrowDown className="h-4 w-4 text-yellow-500" />,
//   LOW: <Circle className="h-4 w-4 text-gray-500" />,
// };

// const STAGE_ICONS = {
//   RECONCILIATION_COMMITTEE: <Handshake className="h-4 w-4" />,
//   FIRST_INSTANCE_COURT: <Landmark className="h-4 w-4" />,
//   APPEAL_COURT: <Landmark className="h-4 w-4" />,
//   CASSATION_HIGH_COURT: <Landmark className="h-4 w-4" />,
//   EXECUTION: <Gavel className="h-4 w-4" />,
//   UNDER_SETTLEMENT: <Loader2 className="h-4 w-4" />,
//   SETTLED_CLOSED: <BookmarkCheck className="h-4 w-4" />,
//   DISPUTE: <Sword className="h-4 w-4" />,
// };

// const EditCaseInfoForm = ({ case: caseData, setOpen }: EditClientFormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     control,
//     setValue,
//   } = useForm<EditCaseDetailsType>({
//     resolver: zodResolver(editCaseDetailsSchema),
//     defaultValues: {
//       title: caseData.title ?? "",
//       description: caseData.description ?? "",
//       practiseArea: caseData.practiseArea ?? "CIVIL",
//       status: caseData.status ?? "OPEN",
//       matterPriority: caseData.matterPriority ?? "MEDIUM",
//       internalRefNumber: caseData.internalRefNumber ?? "",
//       arrivalDate: caseData.arrivalDate ?? "",
//       filedDate: caseData.filedDate ?? "",
//       closedDate: caseData.closedDate ?? "",
//       estimatedCloseDate: caseData.estimatedCloseDate ?? "",
//       stage: caseData.stage ?? "FIRST_INSTANCE_COURT",
//       teamMemberIds: caseData.teamMemberIds ?? [],
//     }
//   });

//   const onSubmit = async (data: EditCaseDetailsType) => {
//     console.log("Submitted data:", data);
//     // Add your submission logic here
//     setOpen(false);
//   };

//   return (
//     <SheetContent className="h-full overflow-y-scroll bg-white dark:bg-primary">
//       <SheetHeader>
//         <SheetTitle className="mb-4">Edit Case Details</SheetTitle>
//         <SheetDescription asChild>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="w-full space-y-4 text-sm"
//           >
//             <div className="space-y-4">
//               <h3 className="text-base font-medium text-gray-700">
//                 Case Information
//               </h3>

//               {/* Case Title */}
//               <FormField label="Title" error={errors.title?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     {...register("title")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                     placeholder="Enter case title"
//                   />
//                 </div>
//               </FormField>

//               {/* Description */}
//               <FormField label="Description" error={errors.description?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     {...register("description")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                     placeholder="Enter case description"
//                   />
//                 </div>
//               </FormField>

//               {/* Practice Area */}
//               <FormField label="Practice Area" error={errors.practiseArea?.message}>
//                 <Select
//                   onValueChange={(value) => setValue("practiseArea", value)}
//                   defaultValue={caseData.practiseArea}
//                 >
//                   <SelectTrigger className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary">
//                     <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                       {PRACTICE_AREA_ICONS[caseData.practiseArea] || <FileText className="h-4 w-4" />}
//                     </div>
//                     <SelectValue placeholder="Select practice area" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.entries(PRACTICE_AREA_ICONS).map(([key, icon]) => (
//                       <SelectItem key={key} value={key}>
//                         <div className="flex items-center gap-2">
//                           {icon}
//                           {key.split('_').map(word => 
//                             word.charAt(0) + word.slice(1).toLowerCase()
//                           ).join(' ')}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormField>

//               {/* Status */}
//               <FormField label="Status" error={errors.status?.message}>
//                 <Select
//                   onValueChange={(value) => setValue("status", value)}
//                   defaultValue={caseData.status}
//                 >
//                   <SelectTrigger className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary">
//                     <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                       {STATUS_ICONS[caseData.status] || <FileText className="h-4 w-4" />}
//                     </div>
//                     <SelectValue placeholder="Select case status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.entries(STATUS_ICONS).map(([key, icon]) => (
//                       <SelectItem key={key} value={key}>
//                         <div className="flex items-center gap-2">
//                           {icon}
//                           {key.charAt(0) + key.slice(1).toLowerCase()}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormField>

//               {/* Matter Priority */}
//               <FormField label="Priority" error={errors.matterPriority?.message}>
//                 <Select
//                   onValueChange={(value) => setValue("matterPriority", value)}
//                   defaultValue={caseData.matterPriority}
//                 >
//                   <SelectTrigger className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary">
//                     <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                       {PRIORITY_ICONS[caseData.matterPriority] || <FileText className="h-4 w-4" />}
//                     </div>
//                     <SelectValue placeholder="Select priority" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.entries(PRIORITY_ICONS).map(([key, icon]) => (
//                       <SelectItem key={key} value={key}>
//                         <div className="flex items-center gap-2">
//                           {icon}
//                           {key.charAt(0) + key.slice(1).toLowerCase()}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormField>

//               {/* Internal Reference Number */}
//               <FormField label="Reference Number" error={errors.internalRefNumber?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     {...register("internalRefNumber")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                     placeholder="Enter internal reference number"
//                   />
//                 </div>
//               </FormField>

//               {/* Stage */}
//               <FormField label="Stage" error={errors.stage?.message}>
//                 <Select
//                   onValueChange={(value) => setValue("stage", value)}
//                   defaultValue={caseData.stage}
//                 >
//                   <SelectTrigger className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary">
//                     <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                       {STAGE_ICONS[caseData.stage] || <FileText className="h-4 w-4" />}
//                     </div>
//                     <SelectValue placeholder="Select case stage" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.entries(STAGE_ICONS).map(([key, icon]) => (
//                       <SelectItem key={key} value={key}>
//                         <div className="flex items-center gap-2">
//                           {icon}
//                           {key.split('_').map(word => 
//                             word.charAt(0) + word.slice(1).toLowerCase()
//                           ).join(' ')}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormField>

//               {/* Arrival Date */}
//               <FormField label="Arrival Date" error={errors.arrivalDate?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     type="date"
//                     {...register("arrivalDate")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                   />
//                 </div>
//               </FormField>

//               {/* Filed Date */}
//               <FormField label="Filed Date" error={errors.filedDate?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     type="date"
//                     {...register("filedDate")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                   />
//                 </div>
//               </FormField>

//               {/* Closed Date */}
//               <FormField label="Closed Date" error={errors.closedDate?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     type="date"
//                     {...register("closedDate")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                   />
//                 </div>
//               </FormField>

//               {/* Estimated Close Date */}
//               <FormField label="Estimated Close Date" error={errors.estimatedCloseDate?.message}>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
//                   <Input
//                     type="date"
//                     {...register("estimatedCloseDate")}
//                     className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
//                   />
//                 </div>
//               </FormField>
//             </div>

//             <Button
//               type="submit"
//               className="mt-6 w-full bg-primary text-secondary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? <Spinner /> : "SAVE"}
//             </Button>
//           </form>
//         </SheetDescription>
//       </SheetHeader>
//     </SheetContent>
//   );
// };

// export default EditCaseInfoForm;