"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

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

export default function FBACalculator() {
  const [dimensions, setDimensions] = useState<Dimensions>({
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const [fees, setFees] = useState<FBAFees | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof Dimensions, value: string) => {
    // Only allow numbers and decimal points
    if (value && !/^\d*\.?\d*$/.test(value)) return;

    setDimensions(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear any previous error
    setError(null);
  };

  const calculateFees = async () => {
    // Validate inputs
    const values = Object.values(dimensions);
    if (values.some(val => !val)) {
      setError('Please fill in all dimensions and weight');
      setFees(null);
      return;
    }

    try {
      const response = await fetch('/api/tools/fba-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dimensions)
      });

      if (!response.ok) {
        throw new Error('Failed to calculate fees');
      }

      const data = await response.json();
      setFees(data);
    } catch (err) {
      setError('Error calculating fees. Please try again.');
      setFees(null);
    }
  };

  // Calculate fees whenever dimensions change
  React.useEffect(() => {
    const hasAllValues = Object.values(dimensions).every(val => val !== '');
    if (hasAllValues) {
      calculateFees();
    }
  }, [dimensions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate FBA Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Dimensions (in inches)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Length</label>
                  <Input
                    placeholder="Enter length"
                    value={dimensions.length}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Width</label>
                  <Input
                    placeholder="Enter width"
                    value={dimensions.width}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <Input
                    placeholder="Enter height"
                    value={dimensions.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Weight (in pounds)</h3>
              <div className="max-w-xs">
                <Input
                  placeholder="Enter weight"
                  value={dimensions.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {fees && (
        <Card>
          <CardHeader>
            <CardTitle>Estimated FBA Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Fulfillment Fee</div>
                <div className="text-xl font-semibold">{formatCurrency(fees.fulfillmentFee)}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Storage Fee (per month)</div>
                <div className="text-xl font-semibold">{formatCurrency(fees.storageFee)}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Referral Fee</div>
                <div className="text-xl font-semibold">{formatCurrency(fees.referralFee)}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Estimated Fees</div>
                <div className="text-xl font-semibold text-blue-600">
                  {formatCurrency(fees.totalFees)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}