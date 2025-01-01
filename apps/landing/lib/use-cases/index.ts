// lib/use-cases/index.ts

import { UseCase, useCases } from "../../data/use-cases/data";

export function getAllUseCaseSlugs(): string[] {
  return useCases.map(useCase => useCase.slug);
}

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find(useCase => useCase.slug === slug);
}

export function getAllUseCases(): UseCase[] {
  return useCases;
}