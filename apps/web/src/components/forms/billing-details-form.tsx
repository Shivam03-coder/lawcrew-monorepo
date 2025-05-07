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
  StickyNote,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useAppToasts } from "@/hooks/use-app-toast";
import FormField from "@/components/shared/form-field";
import { caseBillingSchema, type CaseBillingType } from "@lawcrew/schema";
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

const BillingDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CaseBillingType>({
    resolver: zodResolver(caseBillingSchema),
    defaultValues: {
      caseId: "",
      amount: 0,
      billingNote: "",
      paymentDate: new Date().toISOString(),
      paymentMethod: "ONLINE",
      paymentStatus: "PENDING",
      rateType: "FIXED",
    },
  });

  const { data: LitigationCase } = api.litigation.getCasedetails.useQuery();
  const createBillingMutation = api.litigation.createBillings.useMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();

  const handleDateChange = (date: Date | undefined) => {
    setValue("paymentDate", date?.toISOString() || "");
  };

  const parseDate = (dateString: string | undefined): Date | undefined => {
    return dateString ? new Date(dateString) : undefined;
  };

  const onSubmit = (data: CaseBillingType) => {
    createBillingMutation.mutate(data, {
      onSuccess: () => {
        SuccessToast({ title: "Billing record created successfully!" });
        reset();
      },
      onError: (error) => {
        ErrorToast({
          title: "Failed to create billing record",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="max-h-[80%] w-[730px] overflow-y-visible bg-white px-5 font-lexend shadow-none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 text-sm"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Case Selection */}
          <FormField label="Case" error={errors.caseId?.message}>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) => setValue("caseId", value)}
                value={watch("caseId")}
              >
                <SelectTrigger className="focus:border-1 focus:border-1 rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:ring-primary">
                  <SelectValue placeholder="Select case" />
                </SelectTrigger>
                <SelectContent>
                  {LitigationCase?.caseDetails.map((litigationItem) => (
                    <SelectItem
                      key={litigationItem.id}
                      value={litigationItem.id}
                    >
                      {litigationItem.title} ({litigationItem.internalRefNumber}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Amount */}
          <FormField label="Amount" error={errors.amount?.message}>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                type="number"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                className="rounded-full border border-primary/60 bg-white pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter amount"
                disabled={createBillingMutation.isPending}
              />
            </div>
          </FormField>

          {/* Rate Type */}
          <FormField label="Rate Type" error={errors.rateType?.message}>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) => setValue("rateType", value as any)}
                value={watch("rateType")}
              >
                <SelectTrigger className="focus:border-1 focus:border-1 rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:ring-primary">
                  <SelectValue placeholder="Select rate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIXED">Fixed</SelectItem>
                  <SelectItem value="HOURLY">Hourly</SelectItem>
                  <SelectItem value="CONTINGENCY">Contingency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Payment Method */}
          <FormField
            label="Payment Method"
            error={errors.paymentMethod?.message}
          >
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) =>
                  setValue("paymentMethod", value as any)
                }
                value={watch("paymentMethod")}
              >
                <SelectTrigger className="focus:border-1 focus:border-1 rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:ring-primary">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CHECK">Check</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Payment Status */}
          <FormField
            label="Payment Status"
            error={errors.paymentStatus?.message}
          >
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
              <Select
                onValueChange={(value) =>
                  setValue("paymentStatus", value as any)
                }
                value={watch("paymentStatus")}
              >
                <SelectTrigger className="focus:border-1 focus:border-1 rounded-full bg-white pl-12 text-primary placeholder:text-primary/60 focus:ring-primary">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          {/* Payment Date */}
          <FormField label="Payment Date" error={errors.paymentDate?.message}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start border border-primary/60 text-left font-normal",
                    !watch("paymentDate") && "text-primary",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("paymentDate") ? (
                    format(parseDate(watch("paymentDate"))!, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseDate(watch("paymentDate"))}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormField>

          {/* Billing Note */}
          <FormField
            className="md:col-span-2"
            label="Billing Note"
            error={errors.billingNote?.message}
          >
            <div className="relative">
              <StickyNote className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Textarea
                {...register("billingNote")}
                className="min-h-[100px] w-full rounded-lg border border-primary/60 bg-white p-3 pl-9 transition-all focus:ring-1 focus:ring-dark"
                placeholder="Enter billing notes"
                disabled={createBillingMutation.isPending}
              />
            </div>
          </FormField>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-primary text-secondary"
          disabled={createBillingMutation.isPending}
        >
          {createBillingMutation.isPending ? (
            <Spinner color="#f2f8ff" />
          ) : (
            "Create Billing Record"
          )}
        </Button>
      </form>
    </div>
  );
};

export default BillingDetailsForm;
