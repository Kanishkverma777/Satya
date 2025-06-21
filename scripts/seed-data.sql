-- Seed data for Satya platform
-- This script populates the database with initial test data

-- Insert sample users
INSERT INTO users (email, username, full_name, subscription_tier, total_score, detection_accuracy, streak_days) VALUES
('alex.chen@example.com', 'alexchen', 'Alex Chen', 'pro', 12450, 96.5, 45),
('sarah.johnson@example.com', 'sarahj', 'Sarah Johnson', 'free', 11280, 94.2, 32),
('mike.rodriguez@example.com', 'mikerod', 'Mike Rodriguez', 'pro', 10950, 92.8, 28),
('emma.wilson@example.com', 'emmaw', 'Emma Wilson', 'free', 9870, 91.3, 21),
('david.kim@example.com', 'davidk', 'David Kim', 'enterprise', 9340, 89.7, 19);

-- Insert sample achievements
INSERT INTO user_achievements (user_id, achievement_type, achievement_name, description, points_awarded) VALUES
((SELECT id FROM users WHERE username = 'alexchen'), 'detection', 'Expert Detector', 'Maintain 95%+ accuracy over 50 detections', 500),
((SELECT id FROM users WHERE username = 'alexchen'), 'quiz', 'Quiz Master', 'Score 100% on 5 different quizzes', 300),
((SELECT id FROM users WHERE username = 'alexchen'), 'community', 'Community Helper', 'Help verify 100+ community submissions', 200),
((SELECT id FROM users WHERE username = 'sarahj'), 'detection', 'Deepfake Hunter', 'Correctly identify 100 AI-generated media', 400),
((SELECT id FROM users WHERE username = 'sarahj'), 'speed', 'Speed Demon', 'Complete 10 detections in under 5 seconds each', 150),
((SELECT id FROM users WHERE username = 'mikerod'), 'audio', 'Audio Expert', 'Achieve 95%+ accuracy on audio detection', 350),
((SELECT id FROM users WHERE username = 'mikerod'), 'challenge', 'Challenger', 'Complete 5 different challenges', 250);

-- Insert sample detection results
INSERT INTO detection_results (
    user_id, 
    file_name, 
    file_type, 
    file_size, 
    confidence_score, 
    is_ai_generated, 
    processing_time_ms,
    model_results,
    metadata,
    analysis_details,
    is_public
) VALUES
(
    (SELECT id FROM users WHERE username = 'alexchen'),
    'suspicious_video.mp4',
    'video/mp4',
    15728640, -- 15MB
    87,
    true,
    3200,
    '[
        {"name": "Sensity AI", "confidence": 89, "details": "Detected facial inconsistencies"},
        {"name": "Reality Defender", "confidence": 85, "details": "Found compression artifacts"}
    ]'::jsonb,
    '{"dimensions": "1920x1080", "duration": "0:45", "format": "MP4"}'::jsonb,
    '{"lipSync": 45, "faceConsistency": 38, "audioVisualSync": 52}'::jsonb,
    true
),
(
    (SELECT id FROM users WHERE username = 'sarahj'),
    'authentic_photo.jpg',
    'image/jpeg',
    2097152, -- 2MB
    23,
    false,
    1800,
    '[
        {"name": "Sensity AI", "confidence": 25, "details": "Natural lighting and shadows"},
        {"name": "GenConViT", "confidence": 21, "details": "Authentic texture patterns"}
    ]'::jsonb,
    '{"dimensions": "1920x1080", "format": "JPEG"}'::jsonb,
    '{"faceConsistency": 89}'::jsonb,
    true
);

-- Insert sample learning progress
INSERT INTO learning_progress (user_id, lesson_id, lesson_title, score, time_spent_seconds) VALUES
((SELECT id FROM users WHERE username = 'alexchen'), 'lesson-1', 'Introduction to Deepfakes', 95, 300),
((SELECT id FROM users WHERE username = 'alexchen'), 'lesson-2', 'Spotting Visual Artifacts', 88, 480),
((SELECT id FROM users WHERE username = 'sarahj'), 'lesson-1', 'Introduction to Deepfakes', 92, 280),
((SELECT id FROM users WHERE username = 'mikerod'), 'lesson-1', 'Introduction to Deepfakes', 85, 320);

-- Insert sample challenge participation
INSERT INTO challenge_participation (user_id, challenge_id, challenge_name, score, rank_position) VALUES
((SELECT id FROM users WHERE username = 'alexchen'), 'challenge-1', 'Spot the Deepfake', 950, 1),
((SELECT id FROM users WHERE username = 'sarahj'), 'challenge-1', 'Spot the Deepfake', 920, 2),
((SELECT id FROM users WHERE username = 'mikerod'), 'challenge-2', 'Voice Clone Detection', 880, 1),
((SELECT id FROM users WHERE username = 'emmaw'), 'challenge-1', 'Spot the Deepfake', 850, 5);

-- Insert sample API usage data
INSERT INTO api_usage (user_id, api_key_hash, endpoint, request_count, date) VALUES
((SELECT id FROM users WHERE username = 'davidk'), 'hash123', '/api/detect', 45, CURRENT_DATE),
((SELECT id FROM users WHERE username = 'davidk'), 'hash123', '/api/analyze-url', 23, CURRENT_DATE),
((SELECT id FROM users WHERE username = 'alexchen'), 'hash456', '/api/detect', 12, CURRENT_DATE);

-- Insert sample monitoring alerts
INSERT INTO monitoring_alerts (platform, content_url, detection_confidence, is_ai_generated, alert_level) VALUES
('twitter', 'https://twitter.com/user/status/123456789', 92, true, 'high'),
('youtube', 'https://youtube.com/watch?v=abc123', 78, true, 'medium'),
('tiktok', 'https://tiktok.com/@user/video/123456', 65, true, 'medium');

-- Insert sample community flags
INSERT INTO community_flags (detection_result_id, user_id, flag_type, reason, status) VALUES
(
    (SELECT id FROM detection_results LIMIT 1),
    (SELECT id FROM users WHERE username = 'sarahj'),
    'incorrect',
    'I believe this detection result is incorrect based on my analysis',
    'pending'
);
