import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useArea = () => {
  const fetchProvince = () => {
    const { data, error, isLoading } = useSWR<{ provinces: string[] }>(
      `/area/province`,
      fetcher.fetch
    );

    return {
      province: data?.provinces.sort() || [],
      isError: error,
      isLoading,
    };
  };

  const fetchCity = (province: string) => {
    const { data, error, isLoading } = useSWR<{ cities: string[] }>(
      province ? `/area/city/${decodeURIComponent(province)}` : null,
      fetcher.fetch
    );

    return {
      city: data?.cities.sort() || [],
      isError: error,
      isLoading,
    };
  };

  const fetchSubDistrict = (city: string) => {
    const { data, error, isLoading } = useSWR<{ subDistricts: string[] }>(
      city ? `/area/sub-district/${decodeURIComponent(city)}` : null,
      fetcher.fetch
    );

    return {
      subDistrict: data?.subDistricts.sort() || [],
      isError: error,
      isLoading,
    };
  };

  const fetchZipCode = (subDistrict: string) => {
    const { data, error, isLoading } = useSWR<{ zipCodes: string[] }>(
      subDistrict ? `/area/zip-code/${decodeURIComponent(subDistrict)}` : null,
      fetcher.fetch
    );

    return {
      zipCode: data?.zipCodes.sort() || [],
      isError: error,
      isLoading,
    };
  };

  return { fetchProvince, fetchCity, fetchSubDistrict, fetchZipCode };
};
