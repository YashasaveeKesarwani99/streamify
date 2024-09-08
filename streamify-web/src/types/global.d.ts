declare global {
  interface MetricCardsResponse {
    totalUsers: number;
    activeUsers: number;
    totalStreams: number;
    revenue: number;
  }

  interface MostStreamedResponse {
    artistName: string;
    revenueGenerated: string;
    numberOfUsers: string;
    image: string;
  }

  interface RevenueDistributionResponse {
    ads: number;
    subscriptions: number;
  }

  interface Songs {
    songTitle: string;
    streams: number;
  }

  interface TopStreamsResponse {
    top5StreamedSongs: Songs[];
  }

  interface UserGrowthResponse {
    userGrowth: {
      months: string[];
      totalUsers: number[];
      activeUsers: number[];
    };
  }

  interface TableDataResponse {
    songName: string;
    artist: string;
    streamCount: number;
    userId: string;
  }
}

export {};
