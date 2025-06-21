-- Satya Database Schema
-- This script creates the database structure for the AI media detection platform

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    subscription_tier VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
    total_score INTEGER DEFAULT 0,
    detection_accuracy DECIMAL(5,2) DEFAULT 0.00,
    streak_days INTEGER DEFAULT 0,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Detection results table
CREATE TABLE detection_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    file_size BIGINT,
    file_url TEXT,
    source_url TEXT, -- For URL-based analysis
    confidence_score INTEGER NOT NULL,
    is_ai_generated BOOLEAN NOT NULL,
    processing_time_ms INTEGER,
    model_results JSONB, -- Store individual model results
    metadata JSONB, -- File metadata (dimensions, duration, etc.)
    analysis_details JSONB, -- Detailed analysis (lip sync, face consistency, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    blockchain_hash VARCHAR(64), -- For blockchain transparency
    is_public BOOLEAN DEFAULT FALSE
);

-- Community flags table
CREATE TABLE community_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    detection_result_id UUID REFERENCES detection_results(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    flag_type VARCHAR(50) NOT NULL, -- 'incorrect', 'spam', 'inappropriate'
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, reviewed, resolved
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP
);

-- User achievements table
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_type VARCHAR(50) NOT NULL,
    achievement_name VARCHAR(100) NOT NULL,
    description TEXT,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    points_awarded INTEGER DEFAULT 0
);

-- Learning progress table
CREATE TABLE learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL,
    lesson_title VARCHAR(200) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score INTEGER, -- For quizzes
    time_spent_seconds INTEGER
);

-- Challenge participation table
CREATE TABLE challenge_participation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id VARCHAR(50) NOT NULL,
    challenge_name VARCHAR(200) NOT NULL,
    score INTEGER,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rank_position INTEGER
);

-- API usage tracking table
CREATE TABLE api_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    api_key_hash VARCHAR(64),
    endpoint VARCHAR(100) NOT NULL,
    request_count INTEGER DEFAULT 1,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Real-time monitoring alerts table
CREATE TABLE monitoring_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL, -- twitter, youtube, tiktok, instagram
    content_url TEXT NOT NULL,
    content_hash VARCHAR(64),
    detection_confidence INTEGER,
    is_ai_generated BOOLEAN,
    alert_level VARCHAR(20), -- low, medium, high, critical
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notified_users INTEGER DEFAULT 0
);

-- Blockchain verification logs table
CREATE TABLE blockchain_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    detection_result_id UUID REFERENCES detection_results(id) ON DELETE CASCADE,
    transaction_hash VARCHAR(66), -- Polygon transaction hash
    block_number BIGINT,
    contract_address VARCHAR(42),
    gas_used INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' -- pending, confirmed, failed
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_detection_results_user_id ON detection_results(user_id);
CREATE INDEX idx_detection_results_created_at ON detection_results(created_at);
CREATE INDEX idx_community_flags_status ON community_flags(status);
CREATE INDEX idx_api_usage_user_date ON api_usage(user_id, date);
CREATE INDEX idx_monitoring_alerts_platform ON monitoring_alerts(platform);
CREATE INDEX idx_blockchain_logs_status ON blockchain_logs(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to users table
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
