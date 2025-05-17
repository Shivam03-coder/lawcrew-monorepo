"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  User,
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
import { useEffect } from "react";
import { SelectedMembersType } from "@/types/global";
import { useLocalStorage } from "usehooks-ts";
import { Textarea } from "@/components/ui/textarea";
import UplaodFile from "./uplaod-case-file-form";

interface CaseDetailsFormProps {
  selectedMembers: SelectedMembersType[];
  setSelectedMembers: React.Dispatch<
    React.SetStateAction<SelectedMembersType[]>
  >;
  onMemberSelect: (memberId: string) => void;
}

const CaseDetailsForm = ({
  selectedMembers,
  onMemberSelect,
  setSelectedMembers,
}: CaseDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CaseDetailsType>({
    resolver: zodResolver(caseDetailsSchema),
    defaultValues: {
      title: "",
      description: "",
      practiseArea: "CIVIL",
      status: "OPEN",
      internalRefNumber: "",
      teamMemberIds: [],
      arrivalDate: new Date().toISOString(),
      filedDate: new Date().toISOString(),
      closedDate: null,
      estimatedCloseDate: new Date().toISOString(),
      docsUrl: "",
      clientId: "",
      matterPriority: "HIGH",
      stage: "EXECUTION",
      labels: "",
      note: "",
    },
  });

  const { data: clients } = api.participant.getClient.useQuery();
  const { data: members } = api.participant.getMember.useQuery();
  const createCaseMutation = api.litigation.createCase.useMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();
  const [caseId, setCaseId] = useLocalStorage<string | undefined>("caseId", "");

  useEffect(() => {
    setValue(
      "teamMemberIds",
      selectedMembers.map((m) => m.id),
    );
  }, [selectedMembers, setValue]);

  const onSubmit = (caseDetails: CaseDetailsType) => {
    if (!caseDetails) return;

    createCaseMutation.mutate(caseDetails, {
      onSuccess: (res) => {
        SuccessToast({ title: "Case created successfully!" });
        setSelectedMembers([]);
        reset();
        setCaseId(res?.id as string);
      },
      onError: () => {
        ErrorToast({ title: "Failed to create case." });
      },
    });
  };

  const handleDateChange =
    (field: keyof CaseDetailsType) => (date: Date | undefined) => {
      setValue(field, date?.toISOString() || null);
    };

  const parseDate = (
    dateString: string | null | undefined,
  ): Date | undefined => {
    return dateString ? new Date(dateString) : undefined;
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
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
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
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
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
                className="min-h-[100px] w-full rounded-lg border border-primary/60 bg-white p-3 pl-9 transition-all focus:ring-1 focus:ring-primary"
                placeholder="Enter case Tags seprated by comma,"
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
                className="min-h-[100px] w-full rounded-lg border border-primary/60 bg-white p-3 pl-9 transition-all focus:ring-1 focus:ring-primary"
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
                <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
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
                <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
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
                <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
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
                <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
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

          {/* Internal Reference Number */}
          <FormField
            label="Internal Reference"
            error={errors.internalRefNumber?.message}
          >
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                {...register("internalRefNumber")}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-primary"
                placeholder="Enter reference number"
                disabled={createCaseMutation.isPending}
              />
            </div>
          </FormField>

          <UplaodFile
            isLoading={createCaseMutation.isPending}
            setvalue={setValue}
          />

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
                    format(parseDate(watch("arrivalDate"))!, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseDate(watch("arrivalDate"))}
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
                    format(parseDate(watch("filedDate"))!, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseDate(watch("filedDate"))}
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
                    format(parseDate(watch("estimatedCloseDate"))!, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseDate(watch("estimatedCloseDate"))}
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
                    format(parseDate(watch("closedDate"))!, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseDate(watch("closedDate"))}
                  onSelect={handleDateChange("closedDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>

          <FormField label="Member ID" error={errors.clientId?.message}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select onValueChange={onMemberSelect} value="">
                <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
                  <SelectValue placeholder="Select a member to add" />
                </SelectTrigger>
                <SelectContent>
                  {members
                    ?.filter(
                      (m) =>
                        !selectedMembers.some((s) => s.id === m.TeamMember?.id),
                    )
                    .map((member) => (
                      <SelectItem
                        key={member.TeamMember?.id}
                        value={member.TeamMember?.id as string}
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {member.firstName.charAt(0).toUpperCase() +
                              member.lastName?.charAt(0)}
                          </span>
                          {`${member.firstName} ${member.lastName}`}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Client ID */}
          <FormField label="Client ID" error={errors.clientId?.message}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) => setValue("clientId", value as any)}
                defaultValue={watch("clientId")}
                value={watch("clientId")}
              >
                <SelectTrigger className="focus:border-2-primary rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:border-2 focus:ring-primary">
                  <SelectValue placeholder="Select client for case" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem
                      key={client.TeamClient?.id}
                      value={client.TeamClient?.id as string}
                    >
                      {`${client.firstName} ${client.lastName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
