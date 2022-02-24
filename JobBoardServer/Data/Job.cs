using System.ComponentModel.DataAnnotations;

namespace JobBoardServer.Data
{
    internal sealed class Job
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100000)]
        public string Description { get; set; } = string.Empty;
    }
}
