"use client";
import { useState } from "react";
import { StaffList } from "@/components/staff/StaffList";
import { StaffForm } from "@/components/staff/StaffForm";
import { RoleList } from "@/components/staff/RoleList";
import { RoleForm } from "@/components/staff/RoleForm";

type ViewMode = "list" | "add-staff" | "edit-staff" | "roles" | "add-role" | "edit-role";

interface SelectedStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  branch: string;
}

interface SelectedRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function StaffPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedStaff, setSelectedStaff] = useState<SelectedStaff | null>(null);
  const [selectedRole, setSelectedRole] = useState<SelectedRole | null>(null);

  const handleEditStaff = (staff: SelectedStaff) => {
    setSelectedStaff(staff);
    setViewMode("edit-staff");
  };

  const handleEditRole = (role: SelectedRole) => {
    setSelectedRole(role);
    setViewMode("edit-role");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedStaff(null);
  };

  const handleBackToRoles = () => {
    setViewMode("roles");
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Staff & User Roles</h1>
          <p className="text-muted-foreground">Manage your team members and their permissions</p>
        </div>

        {viewMode === "list" && (
          <StaffList
            onAddStaff={() => setViewMode("add-staff")}
            onEditStaff={handleEditStaff}
            onManageRoles={() => setViewMode("roles")}
          />
        )}

        {viewMode === "add-staff" && <StaffForm onBack={handleBackToList} />}

        {viewMode === "edit-staff" && selectedStaff && (
          <StaffForm staff={selectedStaff} onBack={handleBackToList} />
        )}

        {viewMode === "roles" && (
          <RoleList
            onBack={handleBackToList}
            onCreateRole={() => setViewMode("add-role")}
            onEditRole={handleEditRole}
          />
        )}

        {viewMode === "add-role" && <RoleForm onBack={handleBackToRoles} />}

        {viewMode === "edit-role" && selectedRole && (
          <RoleForm role={selectedRole} onBack={handleBackToRoles} />
        )}
      </div>
    </div>
  );
}
