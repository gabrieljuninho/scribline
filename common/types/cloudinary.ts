export type Resource = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  placeholder: boolean;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  backup: boolean;
  folder: string;
  url: string;
  secure_url: string;
};

export type Folder = {
  name: string;
  path: string;
  external_id: string;
};

export type ResourcesResponse = {
  resources: Resource[];
  next_cursor: string;
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
};

export type CreateFolderResponse = {
  success: boolean;
  path: string;
  name: string;
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
};

export type RootFolderResponse = {
  folders: Folder[];
  next_cursor: string | null;
  total_count: number;
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
};
