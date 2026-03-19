import React, { useMemo, useState, useEffect } from "react";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DEPARTMENT_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { Subject } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { type CrudFilters } from "@refinedev/core";

const SubjectList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const columns = useMemo<ColumnDef<Subject>[]>(
    () => [
      {
        id: "courseCode",
        header: () => <p className="column-title ml-2">Code</p>,
        accessorKey: "courseCode",
        size: 100,
        cell: ({ getValue }) => (
          <span className="text-foreground font-medium">
            {getValue<string>()}
          </span>
        ),
      },
      {
        id: "name",
        header: () => <p className="column-title">Name</p>,
        accessorKey: "name",
        size: 200,
        cell: ({ getValue }) => (
          <span className="text-foreground">
            {getValue<string>()}
          </span>
        ),
      },
      {
        id: "department",
        header: () => <p className="column-title">Department</p>,
        accessorKey: "department",
        size: 150,
        cell: ({ getValue }) => (
          <Badge variant="secondary">
            {getValue<string>()}
          </Badge>
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        size: 300,
        header: () => <p className="column-title">Description</p>,
        cell: ({ getValue }) => (
          <span className="truncate line-clamp-2">
            {getValue<string>()}
          </span>
        ),
      },
    ],
    []
  );

  const subjectTable = useTable<Subject>({
    columns,
    refineCoreProps: {
      resource: "subjects",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        mode: "server",
        initial: [],
      },
      sorters: {
        initial: [],
      },
    },
  });

  const { setFilters } = subjectTable.refineCore;

  useEffect(() => {
    const filters: CrudFilters = [];

    if (searchQuery) {
      filters.push({
        field: "name",
        operator: "contains",
        value: searchQuery,
      });
    }

    if (selectedDepartment !== "all") {
      filters.push({
        field: "department",
        operator: "eq",
        value: selectedDepartment,
      });
    }

    setFilters(filters);
  }, [searchQuery, selectedDepartment, setFilters]);

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Subjects</h1>

      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <div className="search-field relative w-full sm:w-auto">
            <Search className="search-icon absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENT_OPTIONS.map((option) => (
                  <SelectItem key={option.Value} value={option.Value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={subjectTable} />
    </ListView>
  );
};

export default SubjectList;