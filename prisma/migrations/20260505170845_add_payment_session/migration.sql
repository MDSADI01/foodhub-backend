-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('INITIATED', 'SUCCESS', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "payment_session" (
    "id" TEXT NOT NULL,
    "tranId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "payloadSnapshot" JSONB NOT NULL,
    "gatewayResponse" JSONB,
    "orderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_session_tranId_key" ON "payment_session"("tranId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_session_orderId_key" ON "payment_session"("orderId");

-- CreateIndex
CREATE INDEX "payment_session_customerId_idx" ON "payment_session"("customerId");

-- CreateIndex
CREATE INDEX "payment_session_status_idx" ON "payment_session"("status");

-- AddForeignKey
ALTER TABLE "payment_session" ADD CONSTRAINT "payment_session_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_session" ADD CONSTRAINT "payment_session_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
