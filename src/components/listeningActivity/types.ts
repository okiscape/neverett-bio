export interface NowPlayingItem {
  title: string;
  artistName: string;
  coverUrl: string;
  openUrl: string;
  isLocal?: boolean, 
  lastPlayed?: string;
  source: string;  // service name (spotify, lastfm)
}

export interface RecentlyPlayedItem extends Omit<NowPlayingItem, "source"> {}


export interface PlaylistOwner {
	display_name: string,
	href?: string
}
export interface ImageObject {
	height: number,
	width: number,
	url: string
}
export interface TracksListObject {
	href: string,
	total: number,
	limit: number,
	next: number,
	offset: number,
	previous: number,
}
export interface ExternalUrlsObject {
	spotify: string
}


export interface PlaylistObject {
	name: string,
	owner: PlaylistOwner,
	public: boolean,
	images: ImageObject[],
	description: string,
	collaborative: boolean
	tracksTotal: number,
	external_urls: ExternalUrlsObject
	id: string,
	url: string,
	tracks: TracksListObject
}

export type SpotifyNowPlayingResponse =
	NowPlayingSpotifyAPIResponse | { error: string; code: number } | { playing: boolean; message: string };

export interface NowPlayingSpotifyAPIResponse {
  device: {
    supports_volume: boolean,
    volume_percent: number
  },
  modes: {
    shuffle: string,
    repeat: string
  },
  is_playing: boolean,
  progress_ms: number,
  context: {
    type: string,
  },
  item: {
    album: {
      artists: string[],
      name: string,
      total_tracks: number,
      url: string
    },
    artists: string[],
    cover: string,
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    is_local: boolean,
    name: string,
    track_number: number,
    type: string,
    url: string
  },
  ok: boolean
}