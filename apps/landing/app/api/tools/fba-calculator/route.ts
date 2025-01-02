// app/api/tools/fba-calculator/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Dimensions {
  length: string;
  width: string;
  height: string;
  weight: string;
}

interface FBAFees {
  fulfillmentFee: number;
  storageFee: number;
  referralFee: number;
  totalFees: number;
}

const calculateFulfillmentFee = (dimensions: Dimensions): number => {
  const length = parseFloat(dimensions.length);
  const width = parseFloat(dimensions.width);
  const height = parseFloat(dimensions.height);
  const weight = parseFloat(dimensions.weight);

  // Calculate dimensional weight (pounds)
  const dimensionalWeight = (length * width * height) / 166;
  const billableWeight = Math.max(weight, dimensionalWeight);

  // Base rates (simplified for demonstration)
  if (billableWeight <= 1) {
    return 3.22;
  } else if (billableWeight <= 2) {
    return 4.75;
  } else if (billableWeight <= 3) {
    return 5.85;
  } else if (billableWeight <= 20) {
    return 5.85 + ((billableWeight - 3) * 0.38);
  } else {
    return 12.85 + ((billableWeight - 20) * 0.42);
  }
};

const calculateStorageFee = (dimensions: Dimensions): number => {
  const length = parseFloat(dimensions.length);
  const width = parseFloat(dimensions.width);
  const height = parseFloat(dimensions.height);

  // Calculate cubic feet
  const cubicFeet = (length * width * height) / 1728; // Convert cubic inches to cubic feet

  // Standard-size storage fees (per cubic foot per month)
  const monthlyRate = 0.75; // Average rate, actual rates vary by season

  return cubicFeet * monthlyRate;
};

const calculateReferralFee = (dimensions: Dimensions): number => {
  // For this example, we'll use a simplified 15% referral fee
  // based on an assumed product price of $30
  const assumedPrice = 30;
  return assumedPrice * 0.15;
};

export async function POST(request: NextRequest) {
  try {
    const dimensions: Dimensions = await request.json();

    // Validate inputs
    const values = Object.values(dimensions);
    if (values.some(val => !val || isNaN(parseFloat(val)))) {
      return NextResponse.json(
        { error: 'Invalid dimensions or weight' },
        { status: 400 }
      );
    }

    // Calculate individual fees
    const fulfillmentFee = calculateFulfillmentFee(dimensions);
    const storageFee = calculateStorageFee(dimensions);
    const referralFee = calculateReferralFee(dimensions);

    // Calculate total fees
    const totalFees = fulfillmentFee + storageFee + referralFee;

    const fees: FBAFees = {
      fulfillmentFee,
      storageFee,
      referralFee,
      totalFees
    };

    return NextResponse.json(fees);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate fees' },
      { status: 500 }
    );
  }
}