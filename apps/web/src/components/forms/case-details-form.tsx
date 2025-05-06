"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  FileText,
  Hash,
  StickyNote,
  Tag,
  UploadCloud,
  User,
  Gavel,
  AlertCircle,
  Layers,
  Scale,
  Bookmark,
  ClipboardList,
} from "lucide-react";
import { useAppToasts } from "@/hooks/use-app-toast";
import FormField from "@/components/shared/form-field";
import {
  caseDetailsSchema,
  PracticeAreaEnum,
  type CaseDetailsType,
} from "@lawcrew/schema";
import { api } from "@lawcrew/trpc-client/src/client";
import Spinner from "@/components/shared/spinner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "../ui/textarea";

const CaseDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CaseDetailsType>({
    resolver: zodResolver(caseDetailsSchema),
    defaultValues: {
      title: "",
      description: "",
      practiseArea: "CIVIL",
      status: "OPEN",
      internalRefNumber: "",
      teamMemberIds: [],
      arrivalDate: new Date(),
      filedDate: new Date(),
      closedDate: new Date(),
      estimatedCloseDate: new Date(),
      docsUrl: "",
      clientId: "",
      matterPriority: "HIGH",
      stage: "EXECUTION",
      labels: "",
      note: "",
    },
  });

  const router = useRouter();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const createCaseMutation = api.litigation.createCase.useMutation();

  const onSubmit = (data: CaseDetailsType) => {
    console.log(data);
  };

  const handleDateChange =
    (field: keyof CaseDetailsType) => (date: Date | undefined) => {
      if (date) {
        setValue(field, date);
      }
    };

  return (
    <div className="max-h-[80%] w-[730px] overflow-y-visible bg-white px-5 font-lexend shadow-none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 text-sm"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Title */}
          <FormField label="Case Title" error={errors.title?.message}>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                {...register("title")}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter case title"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Note */}
          <FormField label="Case Note" error={errors.note?.message}>
            <div className="relative">
              <StickyNote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                {...register("note")}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter case note"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Labels */}
          <FormField label="Tags" error={errors.labels?.message}>
            <div className="relative">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Textarea
                {...register("labels")}
                className="min-h-[100px] w-full rounded-lg border border-primary/60 bg-white p-3 pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter case Tags"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Description */}
          <FormField
            className="w-full flex-1"
            label="Description"
            error={errors.description?.message}
          >
            <div className="relative">
              <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Textarea
                {...register("description")}
                className="min-h-[100px] w-full rounded-lg border border-primary/60 bg-white p-3 pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter case description"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Status */}
          <FormField label="Status" error={errors.status?.message}>
            <div className="relative">
              <Bookmark className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) => setValue("status", value as any)}
                defaultValue={watch("status")}
                value={watch("status")}
              >
                <SelectTrigger className="w-full pl-9">
                  <SelectValue placeholder="Select case status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Matter Priority */}
          <FormField label="Priority" error={errors.matterPriority?.message}>
            <div className="relative">
              <AlertCircle className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) =>
                  setValue("matterPriority", value as any)
                }
                defaultValue={watch("matterPriority")}
                value={watch("matterPriority")}
              >
                <SelectTrigger className="w-full pl-9">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Stage */}
          <FormField label="Stage" error={errors.stage?.message}>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) => setValue("stage", value as any)}
                defaultValue={watch("stage")}
                value={watch("stage")}
              >
                <SelectTrigger className="w-full pl-9">
                  <SelectValue placeholder="Select case stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RECONCILIATION_COMMITTEE">
                    Reconciliation Committee
                  </SelectItem>
                  <SelectItem value="FIRST_INSTANCE_COURT">
                    First Instance Court
                  </SelectItem>
                  <SelectItem value="APPEAL_COURT">Appeal Court</SelectItem>
                  <SelectItem value="CASSATION_HIGH_COURT">
                    Cassation High Court
                  </SelectItem>
                  <SelectItem value="EXECUTION">Execution</SelectItem>
                  <SelectItem value="UNDER_SETTLEMENT">
                    Under Settlement
                  </SelectItem>
                  <SelectItem value="SETTLED_CLOSED">Settled/Closed</SelectItem>
                  <SelectItem value="DISPUTE">Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Practice Area */}
          <FormField label="Practice Area" error={errors.practiseArea?.message}>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) =>
                  setValue("practiseArea", value as any)
                }
                defaultValue={watch("practiseArea")}
                value={watch("practiseArea")}
              >
                <SelectTrigger className="w-full pl-9">
                  <SelectValue placeholder="Select practice area" />
                </SelectTrigger>
                <SelectContent>
                  {PracticeAreaEnum.options.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Members Id */}
          <FormField label="Member ID" error={errors.clientId?.message}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                {...register("teamMemberIds")}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter member ID"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Client ID */}
          <FormField label="Client ID" error={errors.clientId?.message}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                {...register("clientId")}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter client ID"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Internal Reference Number */}
          <FormField
            label="Internal Reference"
            error={errors.internalRefNumber?.message}
          >
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                {...register("internalRefNumber")}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter reference number"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Docs URL */}
          <FormField label="Upload Docs" error={errors.docsUrl?.message}>
            <div className="relative">
              <UploadCloud className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="rounded-full border border-primary/60 bg-white pl-9 text-primary transition-all file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-1 file:text-sm file:font-medium file:text-gray-500 focus:ring-1 focus:ring-dark"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          {/* Date Fields */}
          <FormField label="Arrival Date" error={errors.arrivalDate?.message}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start border border-primary/60 text-left font-normal",
                    !watch("arrivalDate") && "text-primary",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("arrivalDate") ? (
                    format(watch("arrivalDate"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("arrivalDate")}
                  onSelect={handleDateChange("arrivalDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>

          <FormField label="Filed Date" error={errors.filedDate?.message}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start border border-primary/60 text-left font-normal",
                    !watch("filedDate") && "text-primary",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("filedDate") ? (
                    format(watch("filedDate"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("filedDate")}
                  onSelect={handleDateChange("filedDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>

          <FormField
            label="Estimated Close Date"
            error={errors.estimatedCloseDate?.message}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start border border-primary/60 text-left font-normal",
                    !watch("estimatedCloseDate") && "text-primary",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("estimatedCloseDate") ? (
                    format(watch("estimatedCloseDate"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("estimatedCloseDate")}
                  onSelect={handleDateChange("estimatedCloseDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>

          <FormField label="Closed Date" error={errors.closedDate?.message}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start border border-primary/60 text-left font-normal",
                    !watch("closedDate") && "text-primary",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("closedDate") ? (
                    format(watch("closedDate"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("closedDate")}
                  onSelect={handleDateChange("closedDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-primary text-secondary"
          disabled={createCaseMutation.isPending}
        >
          {createCaseMutation.isPending ? (
            <Spinner color="#f2f8ff" />
          ) : (
            "Create Case"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CaseDetailsForm;
