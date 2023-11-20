// src/services/BidService.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

class BidService {
  async getAllBids(): Promise<Prisma.Bid[]> {
    return prisma.bid.findMany();
  }

  async getBidById(bidId: string): Promise<Prisma.Bid | null> {
    return prisma.bid.findUnique({
      where: {
        id: bidId,
      },
    });
  }

  async placeBid(auctionId: string, userId: string, bidAmount: number): Promise<Prisma.Bid | null> {
    return prisma.bid.create({
      data: {
        amount: bidAmount,
        auction: { connect: { id: auctionId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async updateBid(bidId: string, bidData: Prisma.BidUpdateInput): Promise<Prisma.Bid | null> {
    return prisma.bid.update({
      where: {
        id: bidId,
      },
      data: bidData,
    });
  }

  async withdrawBid(bidId: string): Promise<Prisma.Bid | null> {
    return prisma.bid.delete({
      where: {
        id: bidId,
      },
    });
  }
}

export default new BidService();
