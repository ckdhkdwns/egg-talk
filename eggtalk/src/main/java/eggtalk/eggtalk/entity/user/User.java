package eggtalk.eggtalk.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import eggtalk.eggtalk.entity.BaseTime;
import eggtalk.eggtalk.entity.auth.Authority;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseTime{

   @JsonIgnore
   @Id
   @Column(name = "user_id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer userId;

   @Column(name = "username", length = 50, unique = true)
   private String username;

   @Column(name = "displayname", length = 50)
   private String displayname;

   @JsonIgnore
   @Column(name = "password", length = 100)
   private String password;

   @Column(name = "gender")
   private Boolean gender;

   @Column(name = "email", length = 50, unique = true)
   private String email;

   
   @JsonIgnore
   @ManyToMany
   @JoinTable(
      name = "user_authority",
      joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
      inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;
}