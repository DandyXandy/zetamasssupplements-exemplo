/*
  Warnings:

  - Added the required column `customerDni` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalReference" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerDni" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "customerDistrict" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mpPaymentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "customerAddress", "customerDistrict", "customerEmail", "customerName", "customerPhone", "externalReference", "id", "items", "mpPaymentId", "paymentMethod", "status", "total", "updatedAt") SELECT "createdAt", "customerAddress", "customerDistrict", "customerEmail", "customerName", "customerPhone", "externalReference", "id", "items", "mpPaymentId", "paymentMethod", "status", "total", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_externalReference_key" ON "Order"("externalReference");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
