export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface GameStats {
  trust: number;
  intimacy: number;
}

export interface ChatState {
  messages: Message[];
  stats: GameStats;
  isLoading: boolean;
}