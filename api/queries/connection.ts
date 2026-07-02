import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

// Mock Data
const mockUsers = [
  {
    id: 1,
    unionId: "demo-union-id",
    name: "Demo Administrator",
    email: "admin@srishtieco.com",
    avatar: "",
    role: "admin" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignInAt: new Date(),
  },
  {
    id: 2,
    unionId: "demo-client-id",
    name: "Demo Client",
    email: "client@srishtieco.com",
    avatar: "",
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignInAt: new Date(),
  }
];

const mockClients = [
  {
    id: 1,
    userId: 2,
    managerId: 1,
    status: "active" as const,
    complianceScore: 85,
    notes: "Key account for plastic compliance",
    address: "123 Green Way",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    phone: "+91 98765 43210",
    companyName: "EcoSolutions Ltd",
    businessCategory: "Manufacturing",
    eprPlastic: 5000,
    eprBattery: 1000,
    eprTyre: 2000,
    eprOil: 500,
    eprPlasticFulfilled: 4200,
    eprBatteryFulfilled: 900,
    eprTyreFulfilled: 1800,
    eprOilFulfilled: 450,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: null,
    managerId: 1,
    status: "pending" as const,
    complianceScore: 45,
    notes: "Awaiting documents",
    address: "456 Circular Rd",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 22 2345 6789",
    companyName: "Apex Retailers",
    businessCategory: "Retail",
    eprPlastic: 2000,
    eprBattery: 0,
    eprTyre: 0,
    eprOil: 0,
    eprPlasticFulfilled: 500,
    eprBatteryFulfilled: 0,
    eprTyreFulfilled: 0,
    eprOilFulfilled: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockTasks = [
  {
    id: 1,
    title: "Upload Plastic EPR Certificate",
    description: "Submit the EPR fulfillment certificate for Q2 2026 plastic waste.",
    status: "pending" as const,
    priority: "high" as const,
    assignedTo: 1,
    createdBy: 1,
    clientId: 1,
    dueDate: new Date(Date.now() + 86400000 * 5),
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Review Battery Waste Audit",
    description: "Verify the Q1 battery recycling reports submitted by EcoSolutions.",
    status: "completed" as const,
    priority: "normal" as const,
    assignedTo: 1,
    createdBy: 1,
    clientId: 1,
    dueDate: new Date(Date.now() - 86400000),
    completedAt: new Date(),
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(),
  }
];

const mockDocuments = [
  {
    id: 1,
    name: "epr_plastic_certificate_q2.pdf",
    type: "application/pdf",
    size: 1024 * 350,
    url: "#",
    category: "compliance" as const,
    clientId: 1,
    uploadedBy: 2,
    version: 1,
    isApproved: true,
    approvedBy: 1,
    approvedAt: new Date(),
    createdAt: new Date(),
  }
];

const mockReports = [
  {
    id: 1,
    title: "Annual EPR Compliance Report 2025",
    type: "epr_compliance" as const,
    clientId: 1,
    generatedBy: 1,
    url: "#",
    status: "approved" as const,
    periodStart: new Date("2025-01-01"),
    periodEnd: new Date("2025-12-31"),
    createdAt: new Date("2026-01-15"),
  }
];

const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 99999 88888",
    company: "GreenCorp",
    message: "Interested in onboarding our company for EPR plastic compliance assistance.",
    status: "new" as const,
    createdAt: new Date(),
  }
];

const mockNotifications = [
  {
    id: 1,
    userId: 1,
    title: "EPR Filing Reminder",
    message: "Plastic waste recycling report is due soon.",
    type: "task",
    isRead: false,
    createdAt: new Date(),
  }
];

function getTableName(table: any): string {
  if (!table) return "";
  if (typeof table === "string") return table;
  if (table._ && typeof table._.name === "string") {
    return table._.name;
  }
  if (typeof table.name === "string") {
    return table.name;
  }
  try {
    const str = Object.getOwnPropertySymbols(table)
      .map(sym => table[sym])
      .find(val => val && typeof val.name === "string");
    if (str) return str.name;
  } catch {}
  return "";
}

function createMockDbProxy() {
  const queryResult = (tableName: string, isCount = false, isGroupBy = false) => {
    if (isCount) {
      switch (tableName) {
        case "users": return [{ count: mockUsers.length }];
        case "clients": return [{ count: mockClients.length }];
        case "tasks": return [{ count: mockTasks.length }];
        case "documents": return [{ count: mockDocuments.length }];
        case "reports": return [{ count: mockReports.length }];
        case "contacts": return [{ count: mockContacts.length }];
        default: return [{ count: 0 }];
      }
    }
    
    if (isGroupBy) {
      if (tableName === "tasks") {
        return [
          { status: "pending", count: mockTasks.filter(t => t.status === "pending").length },
          { status: "completed", count: mockTasks.filter(t => t.status === "completed").length },
        ];
      }
      if (tableName === "clients") {
        return [
          { status: "active", count: mockClients.filter(c => c.status === "active").length },
          { status: "pending", count: mockClients.filter(c => c.status === "pending").length },
        ];
      }
    }

    switch (tableName) {
      case "users": return mockUsers;
      case "clients": return mockClients;
      case "tasks": return mockTasks;
      case "documents": return mockDocuments;
      case "reports": return mockReports;
      case "contacts": return mockContacts;
      case "notifications": return mockNotifications;
      default: return [];
    }
  };

  const createHandler = (state: { tableName?: string; isCount?: boolean; isGroupBy?: boolean } = {}) => {
    const target = () => {};
    target.then = (resolve: any) => {
      resolve(queryResult(state.tableName || "", state.isCount, state.isGroupBy));
    };

    return new Proxy(target, {
      get(_t: any, prop: string) {
        if (prop === "then") {
          return target.then;
        }
        if (prop === "select") {
          return (args?: any) => {
            const hasCount = args && JSON.stringify(args).includes("count");
            return createHandler({ ...state, isCount: hasCount });
          };
        }
        if (prop === "from" || prop === "insert" || prop === "update" || prop === "delete") {
          return (table: any) => {
            const tableName = getTableName(table);
            return createHandler({ ...state, tableName });
          };
        }
        if (prop === "values" || prop === "set") {
          return () => createHandler(state);
        }
        if (prop === "where" || prop === "limit" || prop === "offset" || prop === "orderBy" || prop === "groupBy") {
          return (_args?: any) => {
            const isGroupBy = prop === "groupBy";
            return createHandler({ ...state, isGroupBy: isGroupBy || state.isGroupBy });
          };
        }
        return () => createHandler(state);
      }
    });
  };

  return createHandler();
}

let instance: any;

export function getDb() {
  if (!instance) {
    const isMockMode = !env.databaseUrl || env.databaseUrl.includes("127.0.0.1") || env.databaseUrl === "mysql://root:root@127.0.0.1:3306/myapp";
    if (isMockMode) {
      console.log("[db] Database URL is empty or localhost. Initializing MOCK database proxy.");
      instance = createMockDbProxy();
    } else {
      try {
        instance = drizzle(env.databaseUrl, {
          mode: "planetscale",
          schema: fullSchema,
        });
      } catch (err) {
        console.error("[db] Failed to initialize real database. Falling back to MOCK database proxy.", err);
        instance = createMockDbProxy();
      }
    }
  }
  return instance;
}
