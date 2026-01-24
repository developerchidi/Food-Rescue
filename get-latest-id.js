const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latestDonation = await prisma.donation.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { id: true, fulfillmentMethod: true }
  });
  console.log('LATEST_DONATION_ID:', latestDonation?.id);
  console.log('METHOD:', latestDonation?.fulfillmentMethod);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
