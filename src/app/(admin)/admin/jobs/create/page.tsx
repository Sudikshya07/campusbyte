"use client";

import { useState } from "react";
import {
    Building2, MapPin, DollarSign, Clock, Code, FileText,
    ExternalLink, Check, ChevronLeft, ChevronRight, Plus, X, Upload
} from "lucide-react";
import { Button, Input, Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { CreateJobFormData, JobType } from "@/types";

const steps = [
    { id: 1, title: "Company", description: "Select or add company", icon: Building2 },
    { id: 2, title: "Role Details", description: "Job information", icon: MapPin },
    { id: 3, title: "Requirements", description: "Skills & experience", icon: Code },
    { id: 4, title: "Prep Guide", description: "Interview preparation", icon: FileText },
    { id: 5, title: "Application", description: "Apply settings", icon: ExternalLink },
];

const mockCompanies = [
    { id: "c1", name: "Google", isPremium: true },
    { id: "c2", name: "Microsoft", isPremium: true },
    { id: "c3", name: "Amazon", isPremium: true },
    { id: "c4", name: "Startup XYZ", isPremium: false },
];

const suggestedSkills = [
    "React", "Node.js", "TypeScript", "Python", "Java", "Go", "Rust",
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL",
    "Next.js", "Vue.js", "Angular", "Django", "FastAPI", "Spring Boot"
];

const jobTypes: { value: JobType; label: string }[] = [
    { value: "INTERNSHIP", label: "Internship" },
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
];

export default function CreateJobPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
    const [skillInput, setSkillInput] = useState("");

    const [formData, setFormData] = useState<Partial<CreateJobFormData>>({
        companyId: "",
        isNewCompany: false,
        title: "",
        location: "",
        stipend: 0,
        duration: "",
        type: "INTERNSHIP",
        techStack: [],
        experience: "FRESHER",
        prepGuide: "",
        isInternalApply: true,
        applyLink: "",
        isPPO: false,
        deadline: new Date(),
    });

    const updateForm = (updates: Partial<CreateJobFormData>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const addSkill = (skill: string) => {
        if (skill && !formData.techStack?.includes(skill)) {
            updateForm({ techStack: [...(formData.techStack || []), skill] });
        }
        setSkillInput("");
    };

    const removeSkill = (skill: string) => {
        updateForm({ techStack: formData.techStack?.filter((s) => s !== skill) });
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return !!formData.companyId;
            case 2: return !!formData.title && !!formData.location && formData.stipend! > 0;
            case 3: return formData.techStack!.length > 0;
            case 4: return true; // Prep guide is optional
            case 5: return formData.isInternalApply || !!formData.applyLink;
            default: return true;
        }
    };

    const handleSubmit = () => {
        console.log("Submitting job:", formData);
        // In production, this would call the API
        alert("Job posted successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Post New Opportunity</h1>
                <p className="text-slate-600 mt-1">Create a job listing with preparation guide</p>
            </div>

            {/* Stepper - Desktop */}
            <div className="hidden md:flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors",
                                currentStep === step.id
                                    ? "bg-primary text-white"
                                    : currentStep > step.id
                                        ? "bg-accent-50 text-accent"
                                        : "bg-slate-100 text-slate-500"
                            )}
                            onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                        >
                            {currentStep > step.id ? (
                                <Check size={18} />
                            ) : (
                                <step.icon size={18} />
                            )}
                            <span className="text-sm font-medium">{step.title}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "w-12 h-0.5 mx-2",
                                currentStep > step.id ? "bg-accent" : "bg-slate-200"
                            )} />
                        )}
                    </div>
                ))}
            </div>

            {/* Stepper - Mobile */}
            <div className="md:hidden mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">
                        Step {currentStep} of {steps.length}
                    </span>
                    <span className="text-sm text-slate-500">{steps[currentStep - 1].title}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    {/* Step 1: Company Selection */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Select Company
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {mockCompanies.map((company) => (
                                        <button
                                            key={company.id}
                                            onClick={() => updateForm({ companyId: company.id, isNewCompany: false })}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-colors",
                                                formData.companyId === company.id
                                                    ? "border-primary bg-primary-50"
                                                    : "border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                <Building2 size={20} className="text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{company.name}</p>
                                                {company.isPremium && (
                                                    <Badge variant="premium" className="text-xs mt-1">🏛️ Premium</Badge>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => setShowNewCompanyModal(true)}
                                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                                >
                                    <Plus size={16} />
                                    Add New Company
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Role Details */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <Input
                                label="Job Title"
                                placeholder="e.g., Software Engineer Intern"
                                value={formData.title}
                                onChange={(e) => updateForm({ title: e.target.value })}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Location"
                                    placeholder="e.g., Bangalore, India or Remote"
                                    value={formData.location}
                                    onChange={(e) => updateForm({ location: e.target.value })}
                                />
                                <Input
                                    label="Stipend (₹/month)"
                                    type="number"
                                    placeholder="e.g., 50000"
                                    value={formData.stipend || ""}
                                    onChange={(e) => updateForm({ stipend: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Duration"
                                    placeholder="e.g., 6 months"
                                    value={formData.duration}
                                    onChange={(e) => updateForm({ duration: e.target.value })}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Job Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => updateForm({ type: e.target.value as JobType })}
                                        className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        {jobTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Requirements */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tech Stack
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <Input
                                        placeholder="Type a skill and press Enter"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addSkill(skillInput);
                                            }
                                        }}
                                    />
                                    <Button onClick={() => addSkill(skillInput)} disabled={!skillInput}>
                                        Add
                                    </Button>
                                </div>
                                {formData.techStack!.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {formData.techStack!.map((skill) => (
                                            <Badge key={skill} variant="default" className="px-3 py-1">
                                                {skill}
                                                <button onClick={() => removeSkill(skill)} className="ml-2">
                                                    <X size={12} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <p className="text-xs text-slate-500 mb-2">Suggestions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedSkills
                                        .filter((s) => !formData.techStack?.includes(s))
                                        .slice(0, 12)
                                        .map((skill) => (
                                            <button
                                                key={skill}
                                                onClick={() => addSkill(skill)}
                                                className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                                            >
                                                + {skill}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Experience Level
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {["FRESHER", "0-1", "1-3", "3+"].map((exp) => (
                                        <button
                                            key={exp}
                                            onClick={() => updateForm({ experience: exp as CreateJobFormData["experience"] })}
                                            className={cn(
                                                "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors",
                                                formData.experience === exp
                                                    ? "border-primary bg-primary-50 text-primary"
                                                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                                            )}
                                        >
                                            {exp === "FRESHER" ? "Fresher" : `${exp} years`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Prep Guide */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Preparation Guide
                                </label>
                                <p className="text-xs text-slate-500 mb-3">
                                    Help candidates prepare. Include interview tips, LeetCode problems, system design topics, etc.
                                </p>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    {/* Simple toolbar */}
                                    <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                                        <button className="px-2 py-1 text-xs bg-white border rounded hover:bg-slate-100">Bold</button>
                                        <button className="px-2 py-1 text-xs bg-white border rounded hover:bg-slate-100">Italic</button>
                                        <button className="px-2 py-1 text-xs bg-white border rounded hover:bg-slate-100">List</button>
                                        <button className="px-2 py-1 text-xs bg-white border rounded hover:bg-slate-100">Link</button>
                                    </div>
                                    <textarea
                                        rows={12}
                                        value={formData.prepGuide}
                                        onChange={(e) => updateForm({ prepGuide: e.target.value })}
                                        placeholder={`## How to Crack This Role

### Technical Preparation
- Focus on **Arrays, Strings, Trees, Graphs**
- Practice LeetCode Medium problems
- Study system design basics

### Behavioral Questions
- Prepare STAR format answers
- Research company culture

### Timeline
- Week 1-2: DSA fundamentals
- Week 3: Practice problems
- Week 4: Mock interviews`}
                                        className="w-full p-4 text-sm focus:outline-none resize-none font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Attachments (Optional)
                                </label>
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                                    <p className="text-sm text-slate-500">
                                        Drag & drop files or <span className="text-primary cursor-pointer">browse</span>
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">PDF, DOC up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Application */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Application Method
                                </label>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => updateForm({ isInternalApply: true })}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-colors",
                                            formData.isInternalApply
                                                ? "border-primary bg-primary-50"
                                                : "border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                            formData.isInternalApply ? "border-primary" : "border-slate-300"
                                        )}>
                                            {formData.isInternalApply && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">Apply via CampusByte</p>
                                            <p className="text-xs text-slate-500">Candidates apply through our platform</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => updateForm({ isInternalApply: false })}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-colors",
                                            !formData.isInternalApply
                                                ? "border-primary bg-primary-50"
                                                : "border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                            !formData.isInternalApply ? "border-primary" : "border-slate-300"
                                        )}>
                                            {!formData.isInternalApply && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">External ATS Link</p>
                                            <p className="text-xs text-slate-500">Redirect to your careers page</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {!formData.isInternalApply && (
                                <Input
                                    label="External Apply URL"
                                    placeholder="https://careers.company.com/apply/..."
                                    value={formData.applyLink}
                                    onChange={(e) => updateForm({ applyLink: e.target.value })}
                                />
                            )}

                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPPO}
                                        onChange={(e) => updateForm({ isPPO: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent"
                                    />
                                    <div>
                                        <p className="font-medium text-slate-900">Offers PPO</p>
                                        <p className="text-xs text-slate-500">Pre-Placement Offer for top performers</p>
                                    </div>
                                    <Badge variant="accent" className="ml-auto">✨ PPO</Badge>
                                </label>
                            </div>

                            <Input
                                label="Application Deadline"
                                type="date"
                                value={formData.deadline ? new Date(formData.deadline).toISOString().split("T")[0] : ""}
                                onChange={(e) => updateForm({ deadline: new Date(e.target.value) })}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                >
                    <ChevronLeft size={18} className="mr-1" />
                    Previous
                </Button>

                {currentStep < 5 ? (
                    <Button
                        onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                        disabled={!canProceed()}
                    >
                        Next
                        <ChevronRight size={18} className="ml-1" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={!canProceed()}>
                        <Check size={18} className="mr-1" />
                        Publish Job
                    </Button>
                )}
            </div>

            {/* New Company Modal */}
            {showNewCompanyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">Add New Company</h3>
                                <button onClick={() => setShowNewCompanyModal(false)}>
                                    <X size={20} className="text-slate-400 hover:text-slate-600" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <Input label="Company Name" placeholder="e.g., TechCorp Inc" />
                                <Input label="Website" placeholder="https://company.com" />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Company Logo
                                    </label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                                        <Upload className="mx-auto text-slate-400 mb-2" size={20} />
                                        <p className="text-sm text-slate-500">Upload logo</p>
                                    </div>
                                </div>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-slate-300" />
                                    <span className="text-sm text-slate-600">Premium Institute (IIT/NIT)</span>
                                </label>
                                <div className="flex gap-3 mt-4">
                                    <Button variant="outline" className="flex-1" onClick={() => setShowNewCompanyModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="flex-1" onClick={() => {
                                        setShowNewCompanyModal(false);
                                        // In production, this would save the company
                                    }}>
                                        Add Company
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
