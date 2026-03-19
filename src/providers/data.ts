import { DataProvider, BaseRecord, GetListResponse, GetListParams } from "@refinedev/core";

type Subject = BaseRecord & {
  courseCode: string;
  name: string;
  department: string;
  description: string;
};

const mockSubjects: Subject[] = [
  {
    id: "subj-001",
    courseCode: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "Fundamental concepts of computer science, programming, and problem solving.",
  },
  {
    id: "subj-002",
    courseCode: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description:
      "Techniques of integration, infinite series, and applications to physical problems.",
  },
  {
    id: "subj-003",
    courseCode: "ENG301",
    name: "Shakespearean Literature",
    department: "English",
    description:
      "In-depth study of Shakespeare's major plays, themes, and historical context.",
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>(
    params: GetListParams
  ): Promise<GetListResponse<TData>> => {

    if (params.resource !== "subjects") {
      
      return {
        data: [] as TData[],
        total: 0,
      };
    }

    // your logic here for "subjects"
    return {
      data: mockSubjects as unknown as TData[],
      total: mockSubjects.length,
    };
  },
  getOne: async () => {throw new Error("Method not implemented.")},
  create: async () => {throw new Error("Method not implemented.")},
  update: async () => {throw new Error("Method not implemented.")},
  deleteOne: async () => {throw new Error("Method not implemented.")},
   
  getApiUrl: () => "",
};